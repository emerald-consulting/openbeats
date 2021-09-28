from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CustomUserCreate, isLoggedIn

urlpatterns = [
    path('user/create/',
         CustomUserCreate.as_view(),
         name='create_user'),

    path('user/isLoggedIn/',
         isLoggedIn.as_view(),
         name='is_logged_in'),
]

urlpatterns = format_suffix_patterns(urlpatterns)