from django.contrib.auth import authenticate
from django.http.response import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions,parsers, renderers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.template.loader import render_to_string
from django.utils import timezone
from datetime import timedelta
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.contrib.auth import get_user_model
import json

from .models import User

from .serializers import TokenObtainPairSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.permissions import AllowAny

class Health(APIView):
    """
    View to return API connectivity/healthiness.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        return Response(data="healthy", status=HTTP_200_OK)

class ObtainUserTokens(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TokenObtainPairSerializer


class UserCreate(APIView):

    # We need to specify an empty list or tuple for authentication_classes in addition 
    # to setting permission_classes to convince DRF to open up a view to the public.
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordReset(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self,request,format=None):
       print(request.data['email'])
       useremail = request.data['email']
       User = get_user_model()
       if User.objects.filter(username=useremail).exists():
            return Response(data="Email Exists",status=status.HTTP_200_OK)
       else: 
            return Response(data="Email Does not exists",status=status.HTTP_400_BAD_REQUEST) 
       #now just check for email if it is in database then just send response as ok if not 
       #then send error
       #first send error then go for success
    #    data1 =  json.JSONDecoder(request,)
    #    print(data1)
    #    return Response(data=data1,status=status.HTTP_200_OK)

class isLoggedIn(APIView):

    def get(self, request):
        return Response(data="User logged in", status=status.HTTP_200_OK)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            # token.blacklist() - this causes a 400 error - why?
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ThirdPartyAuthLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        emailAddr = request.data['emailAddr']

        if User.objects.filter(email=emailAddr).exists():
            self.sessions.middleware.SessionMiddleware

# class CustomPasswordResetView:
#     @receiver(reset_password_token_created)
#     def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
#         """
#           Handles password reset tokens
#           When a token is created, an e-mail needs to be sent to the user
#         """
#         # send an e-mail to the user
#         context = {
#             'current_user': reset_password_token.user,
#             'username': reset_password_token.user.username,
#             'email': reset_password_token.user.email,
#             'reset_password_url': "users/password-reset/{}".format(reset_password_token.key),
#             'site_name': "Openbeats",
#             'site_domain': "openbeats.com"
#         }

#         # render email text
#         email_html_message = render_to_string('email/user_reset_password.html', context)
#         email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

#         msg = EmailMultiAlternatives(
#             # title:
#             "Password Reset for {}".format("openbeats"),
#             # message:
#             email_plaintext_message,
#             # from:
#             "noreply@{}".format("openbeats.com"),
#             # to:
#             [reset_password_token.user.email]
#         )
#         msg.attach_alternative(email_html_message, "text/html")
#         msg.send()

    
# class CustomPasswordTokenVerificationView(APIView):
#     """
#       An Api View which provides a method to verifiy that a given pw-reset token is valid before actually confirming the
#       reset.
#     """
#     throttle_classes = ()
#     permission_classes = ()
#     parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
#     renderer_classes = (renderers.JSONRenderer,)
#     serializer_class = CustomTokenSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         token = serializer.validated_data['token']

#         # get token validation time
#         password_reset_token_validation_time = get_password_reset_token_expiry_time()

#         # find token
#         reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

#         if reset_password_token is None:
#             return Response({'status': 'invalid'}, status=status.HTTP_404_NOT_FOUND)

#         # check expiry date
#         expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)

#         if timezone.now() > expiry_date:
#             # delete expired token
#             reset_password_token.delete()
#             return Response({'status': 'expired'}, status=status.HTTP_404_NOT_FOUND)

#         # check if user has password to change
#         if not reset_password_token.user.has_usable_password():
#             return Response({'status': 'irrelevant'})

#         return Response({'status': 'OK'})