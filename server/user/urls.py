# admin/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('accounts/',views.UserAccounts.as_view()),
    path('accounts/detail/<int:pk>/',views.UserDetail.as_view())

]