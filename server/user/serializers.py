from rest_framework import serializers
from .models import User
import re

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'status','profile_picture','password')
        extra_kwargs = {'password':{'write_only':True}}
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
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already taken.")
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise serializers.ValidationError("Invalid email format.")
        return value

    def validate_password(self, value):
       
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Password cannot be empty or just spaces.")
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 6 characters long.")
        
        return value

    def create(self,validated_data):
        user = User(
            username=validated_data['username'],
            email =  validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user