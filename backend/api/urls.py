"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from openbeats.views import CustomUserCreate
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from openbeats.views import ObtainTokenPairWithColorView, CustomUserCreate, isLoggedIn, LogoutAndBlacklistRefreshTokenForUserView


urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth paths
    path('token/obtain/',
         ObtainTokenPairWithColorView.as_view(),
         name='token_create'),

    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),

    path('user/create/',
         CustomUserCreate.as_view(),
         name='create_user'),

    path('user/isLoggedIn/',
         isLoggedIn.as_view(),
         name='is_logged_in'),

    path('blacklist/',
         LogoutAndBlacklistRefreshTokenForUserView.as_view(),
         name='blacklist'),

    # Keep on bottom
    path('', include('openbeats.urls'))
]
