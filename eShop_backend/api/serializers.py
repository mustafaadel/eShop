# from django.contrib.auth.models import User
# from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Product

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token payload
        token['is_admin'] = user.is_admin
        token['username'] = user.username

        return token

    # def validate(self, attrs):
    #     data = super().validate(attrs)

    #     # Add custom claims to the response data
    #     data['is_admin'] = self.user.is_admin

    #     return data
    
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
        
