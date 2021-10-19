from django.contrib import admin
from .models import User

class CustomUserAdmin(admin.ModelAdmin):
    model = User

admin.site.register(User, CustomUserAdmin)