
from .models import User
from rest_framework import generics
from .serializers import UserSerializers
from rest_framework import mixins

# Create your views here.

class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSerializers


class UserAccounts(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    

