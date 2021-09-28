from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from openbeats import views

urlpatterns = [
    #path('api/register/', views.Register.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)