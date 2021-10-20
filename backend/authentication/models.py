from django.db import models
from django.contrib.auth.models import AbstractUser

# https://stackoverflow.com/questions/18853688/django-1-6-abstractuser-not-working
class OpenBeatsUser(AbstractUser):
    third_party_refresh_token = models.CharField(max_length=150)

    # Superclass automatically sets email and username fields
    # It also requires email


OpenBeatsUser._meta.get_field('email')._unique=True
