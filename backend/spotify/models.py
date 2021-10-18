from django.db import models
from authentication.models import CustomUser

class SpotifyToken(models.Model):
    session_id = models.CharField(max_length=50, unique=True, default="session_id")
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)
    #user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
