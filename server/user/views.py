from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def sample_view(request):

    return JsonResponse({'name':'sreyas','age':24})