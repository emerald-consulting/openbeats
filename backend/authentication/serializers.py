# djsr/authentication/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import OpenBeatsUser
from rest_framework import serializers


class UserTokenPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(UserTokenPairSerializer, cls).get_token(user=user)
        
        # Add user email to token
        token['email'] = user.email

        return token

from rest_framework import serializers
from .models import OpenBeatsUser
# ...
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
            model = OpenBeatsUser
            fields = ('email', 'password', 'third_party_refresh_token')
            extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # create user with email
        user = OpenBeatsUser(email=validated_data['email'])

        if validated_data['third_party_access_token']:
            user.third_party_refresh_token = validated_data['third_party_refresh_token']
            user.set_unusable_password()
        
        else:
            user.set_password(validated_data['password'])
        
        user.save()

        return user


    def update(self, instance, validated_data):
        email = validated_data['email']

        password = validated_data['password'] if validated_data['password'] else None
        third_party_refresh_token = validated_data['third_party_refresh_token'] \
            if validated_data['third_party_refresh_token'] else None

        user = OpenBeatsUser.objects.filter(email=email)

        if password:
            user.password = password
        if third_party_refresh_token:
            user.third_party_refresh_token = third_party_refresh_token
        
        user.save()

        return user

# class CustomTokenSerializer(serializers.Serializer):
#     token = serializers.CharField()