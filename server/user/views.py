
from .models import User
from rest_framework import generics
from .serializers import UserSerializers
from rest_framework import mixins

# Create your views here.

class UserAccounts(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def get(self,request, *args, **kwargs):
        return self.list(request,*args,**kwargs)

    def post(self,reqeust,*args,**kwargs):
        return self.create(self.request,*args,**kwargs)

class UserDetail(mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.DestroyModelMixin,
                 generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)
    
    def put(self,reqeust,*args,**kwargs):
        return self.update(self.request,*args,**kwargs)
    def delete(self,request,*args,**kwargs):
        return self.destroy(self.request,*args,**kwargs)
        
