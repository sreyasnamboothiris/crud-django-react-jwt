# admin/urls.py
from django.urls import path
from . import views

urlpatterns = [
    
    path('signup/',views.UserSignupView.as_view()),
    path('home/',views.HomeView.as_view(),name='home'),
    path('logout/',views.LogoutView.as_view(),name='logout')

]