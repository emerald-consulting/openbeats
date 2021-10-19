from django.shortcuts import render, redirect
import requests
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from .utils import update_or_create_user_tokens, login_or_create_user
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from requests import Request, post
from .models import SpotifyToken

class SpotifyAuthURL(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    '''1. Frontend calls this API endpoint'''
    def get(self, request, format=None):

        scopes = 'user-read-email'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        '''2. Redirect to url that is returned to us'''
        return Response({'url': url}, status=status.HTTP_200_OK)
        #redirect(url)


'''3. Once user is done authorizing us, will redirect to here'''
def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    '''4. Send request for tokens'''
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID.encode('utf-8'),
        'client_secret': CLIENT_SECRET.encode('utf-8')
    }).json()

    '''5. Store tokens'''
    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        session_id=request.session.session_key,
        access_token=access_token,
        refresh_token=refresh_token,
        token_type=token_type,
        expires_in=expires_in
    )

    '''6. Redirect to get-email endpoint'''
    return redirect("spotify:get-email")

class SpotifyEmailURL(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    '''7. Get email and check if user exists with email'''
    def get(self, request, format=None):
        spotify_email_url = 'https://api.spotify.com/v1/me'
        session_id = self.request.session.session_key
        tokens = SpotifyToken.objects.filter(session_id=session_id)

        if tokens.exists():
            tokens = tokens[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        
        # Check expiry date of access token, if it is expired then it should be
        # refreshed.
        access_token = tokens.access_token

        headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }

        post(
            spotify_email_url, 
            data={'authorization_code': access_token}
        )

        emailAddrJson = requests.get(spotify_email_url, {}, headers=headers).json()

        emailAddr = emailAddrJson.get('email')

        # Login or create user
        login_or_create_user(emailAddr)

        '''Redirect to user's home page'''
        return Response({'email': emailAddr}, status=status.HTTP_200_OK)