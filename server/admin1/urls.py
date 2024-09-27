# admin/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('users/',views.Users.as_view()),
    path('users/detail/<int:pk>/',views.UserDetail.as_view())
]
