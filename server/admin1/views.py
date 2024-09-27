from django.shortcuts import render
from rest_framework import generics
from user.models import User
from user.serializers import UserSerializers

# Create your views here.

class Users(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers