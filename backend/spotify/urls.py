from django.urls import path 
from .views import SpotifyAuthURL, SpotifyEmailURL, spotify_callback

app_name = 'spotify'

urlpatterns = [
    path('get-auth-url', SpotifyAuthURL.as_view()),
    path('redirect', spotify_callback),
    path('get-email', SpotifyEmailURL.as_view(), name='get-email')
]