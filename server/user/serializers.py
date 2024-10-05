from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
import re

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'status', 'profile_picture', 'password', 'is_superuser')
        extra_kwargs = {'password': {'write_only': True,'required':False}}

    def validate_username(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Username cannot be empty or just spaces.")
        if len(value) < 5:
            raise serializers.ValidationError("Username must be at least 5 characters long.")
        if not value.isalnum():
            raise serializers.ValidationError("Username should only contain alphanumeric characters.")
        return value

    def validate_email(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Email cannot be empty or just spaces.")
        
        
        if self.instance:
        
            if self.instance.email != value and User.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        else:
        
            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_password(self, value):
        
        return value

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)


        instance.save()
        return instance




class CustomToken(TokenObtainPairSerializer):

    def validate(self,attrs):
        user = User.objects.get(username=attrs.get('username'))
        password = attrs.get('password')
        if not password:
            raise serializers.ValidationError("Password field is required.")

        if not user.check_password(password):
            raise serializers.ValidationError('Incorrect password')

        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
        }
        return data

    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        return token