
from .models import User
from rest_framework import generics
from .serializers import UserSerializers
from rest_framework import mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny


# Create your views here.

class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSerializers
    permission_classes = [AllowAny]


class HomeView(APIView):
    print(type(IsAuthenticated),'this is the type')
    
    
    def get(self, request):
        user = request.user
        return Response({"username": user.username,
            "email": user.email,})

class LogoutView(APIView):
    permission_classes = (IsAuthenticated)
    def post(self,request):

        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    

