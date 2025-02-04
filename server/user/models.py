from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    email = models.EmailField(unique=True)
    status = models.BooleanField(blank=True, null=True,default=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True,default='default.user.jpg')

    def __str__(self):
        return self.username

