
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
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomToken


# Create your views here.
class UserProfile(generics.RetrieveUpdateAPIView):
    print('user profile update class called')
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [IsAuthenticated]


class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSerializers
    permission_classes = [AllowAny]

class CustomTokenView(TokenObtainPairView):

    serializer_class = CustomToken

    def post(self, request, *args, **kwargs):
        
        email = request.data['email']
        try:
            username = User.objects.get(email=email)
            request.data['username'] = str(username)
        except Exception as e:
            pass 
        try:
            response = super().post(request, *args, **kwargs)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
        return response


class HomeView(APIView):

    def get(self, request):
        user = request.user
        
        try:
            user_profile = User.objects.get(id=user.id)
            serializer = UserSerializers(user_profile)
            return Response(serializer.data)
        except:
            return Response({"Error":"user profile not fouldn"},status=404)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):

        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e,hello)
            return Response(status=status.HTTP_400_BAD_REQUEST)


    

