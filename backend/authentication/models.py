from django.db import models
from django.contrib.auth.models import AbstractUser

# https://stackoverflow.com/questions/18853688/django-1-6-abstractuser-not-working
class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

CustomUser._meta.get_field('email')._unique=True

