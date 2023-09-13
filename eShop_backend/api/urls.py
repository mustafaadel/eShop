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
    path('login/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/' , views.getAllProducts , name='products'),
    path('create-product/' , views.createProduct , name='create-product'),
    path('user-permissions/' , views.getUserPermissions , name='user-permissions'),
    path('view-products/' , views.getAllProducts , name='view-products'),
    path('edit-product/<str:pk>/' , views.editProduct , name='edit-product'),
    path('delete-product/<str:pk>/' , views.deleteProduct , name='delete-product'),
    path('view-product/<str:pk>/' , views.getProduct , name='view-product'),
    path('maker-delivery/<str:pk>/' , views.makeDeliveryRequest , name='delivery-product'),
    path('execute-delivery/<str:pk>/' , views.executeDeliveryRequest , name='execute-delivery'),
    path('get-delivery-requests/' , views.getAllDeliveryRequests , name='get-delivery-requests'),  
]
