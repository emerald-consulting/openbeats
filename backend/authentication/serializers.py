# djsr/authentication/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import OpenBeatsUser
from rest_framework import serializers


class UserTokenPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(UserTokenPairSerializer, cls).get_token(user)

        # Add custom claims here, this is just an example
        return token

from rest_framework import serializers
from .models import OpenBeatsUser
# ...
class UserSerializer(serializers.ModelSerializer):
    class Meta:
            model = OpenBeatsUser
            fields = ['email','username', 'password']
            extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = OpenBeatsUser(
            email=validated_data['email'],
            username=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# class CustomTokenSerializer(serializers.Serializer):
#     token = serializers.CharField()