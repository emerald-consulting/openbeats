from rest_framework import mixins
from rest_framework import generics

from openbeats.serializers import UserSerializer

# Create your views here.
class Register(
    mixins.CreateModelMixin,
    generics.GenericAPIView):

    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
