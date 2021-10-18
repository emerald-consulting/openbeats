from django.shortcuts import render, redirect
import requests
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from .utils import update_or_create_user_tokens
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from requests import Request, post

class AuthURL(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    # 1. Frontend calls this API endpoint
    def get(self, request, format=None):

        scopes = 'user-read-email'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

    # 2. Redirect to url that is returned to us
        return Response({'url': url}, status=status.HTTP_200_OK)
        #redirect(url)

# 3. Once user is done authorizing us, will redirect to here
def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    # 4. Send request for tokens
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    '''
    # 5. Store tokens
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
    '''
    # 5. Retrieve user's email address and create or sign in
    access_token = response.get('access_token')

    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + access_token
    }
    base_url = 'https://api.spotify.com/v1/me'
    post(
        base_url, 
        data={
            'authorization_code': access_token
        }
    )

    email_res = requests.get(base_url, {}, headers=headers).json()

    user_email = email_res.get('email')
    return Response({'email': user_email}, status=status.HTTP_200_OK)

    # 6. Redirect back to the app
    #return redirect("authentication:create_user")