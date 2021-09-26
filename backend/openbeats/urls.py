from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views
from openbeats import views

urlpatterns = [
    path('api/register/', views.Register.as_view()),

    # JWT paths
    path('token/obtain/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_create'),

    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh')
]

urlpatterns = format_suffix_patterns(urlpatterns)