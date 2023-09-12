from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    # path('login/' , views.login , name='login'),
    path('register/' , views.register , name='register'),
    path('protected/' , views.protectedView , name='protected'),
    path('login/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/' , views.getAllProducts , name='products'),
    path('create-product/' , views.createProduct , name='create-product'),
    path('user-permissions/' , views.getUserPermissions , name='user-permissions'),
    path('view-products/' , views.getAllProducts , name='view-products'),
    # path('add-product/' , views.createProduct , name='add-product'),
    path('edit-product/<str:pk>/' , views.editProduct , name='edit-product'),
    path('delete-product/<str:pk>/' , views.deleteProduct , name='delete-product'),
    path('view-product/<str:pk>/' , views.getProduct , name='view-product'),
    
    
]
