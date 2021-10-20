from django.contrib import admin
from .models import OpenBeatsUser

class UserAdmin(admin.ModelAdmin):
    model = OpenBeatsUser

admin.site.register(OpenBeatsUser, UserAdmin)