from django.urls import path,include, re_path
from rest_framework_simplejwt import views as jwt_views
from django.contrib.auth import views as auth_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, isLoggedIn, LogoutAndBlacklistRefreshTokenForUserView,PasswordReset

app_name = 'authentication'


urlpatterns = [
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/isLoggedIn/', isLoggedIn.as_view(), name="is_logged_in"),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('user/reset_password/',PasswordReset.as_view(),name="password_reset"),
    path('user/',include('django.contrib.auth.urls')),

    # # NEW: custom verify-token view which is not included in django-rest-passwordreset
    # path('user/reset-password/verify-token/', CustomPasswordTokenVerificationView.as_view(), name='password_reset_verify_token'),
    # # NEW: The django-rest-passwordreset urls to request a token and confirm pw-reset
    # path('user/reset-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
