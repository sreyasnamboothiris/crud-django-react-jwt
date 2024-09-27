from django.shortcuts import render
from django.http import JsonResponse
from .models import User
from rest_framework import generics
from .serializers import UserSerializers
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

# Create your views here.

def sample_view(request):

    return JsonResponse({'name':'sreyas','age':24})


@api_view(['GET','POST'])
def user_account(request):
    print('ivde vannu')
    if request.method =='GET':
        print('ivdee vannu')
        users = User.objects.all()
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data)
    
    elif request.method =='POST':
        data = JSONParser().parse(request)
        serializer = UserSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','DELETE','PUT'])
def user_detail(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method =='GET':
        serializer = UserSerializers(user)
        return Response(serializer.data)
    
    elif reqeust.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializers(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Respons(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserAccounts(APIView):

    def get(self,request,format=None):
        users = User.objects.all()
        serializer = UserSerializers(users,many=True)
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = UserSerializers(data=request.data)
        print(request ,'here is break /n',request.POST,' here is bradk /n',request.data,'/n')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):

    def get_object(self,pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
        
    def get(self,reqeust,pk,format=None):
        user = self.get_object(pk)
        serializer = UserSerializers(user)
        return Response(serializer.data)
    
    def put(self,reqeust,pk,format=None):
        user = self.get_object(pk)
        serializer = UserSerializers(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    