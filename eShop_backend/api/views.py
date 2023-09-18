from .models import Product, User , DeliveryRequest
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required,permission_required,user_passes_test
from .serializers import ProductSerializer , DeliveryRequestSerializer
import requests
# Create your views here.


@api_view(['POST'])
def register(request):
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        is_admin = request.data['is_admin']
        user = User.objects.create_user(username=username , password=password , email=email , is_admin=is_admin)
        user.save()
        return Response({'message':'User created successfully'} , status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products , many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_add_product' , raise_exception=True)
def createProduct(request):
# save product to database
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data , status=status.HTTP_201_CREATED)
        else:
                return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserPermissions(request):
    user = request.user
    permissions = user.get_all_permissions()
    return Response({'permissions':permissions})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_view_all_products' , raise_exception=True)
def getAllProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products , many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_delete_product' , raise_exception=True)
def deleteProduct(request , pk):
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({'message':'Product deleted successfully'} , status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_edit_product' , raise_exception=True)
def editProduct(request , pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(instance=product , data=request.data)
        if serializer.is_valid():
                serializer.save()
        else:
                return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data , status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_view_all_products' , raise_exception=True)
def getProduct(request , pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product , many=False)
        return Response(serializer.data)
 
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_make_delivery_requests' , raise_exception=True)
def makeDeliveryRequest(request, pk):
        product = Product.objects.get(id=pk)
        request.data['product'] = product.id
        request.data['user'] = request.user.id
        serializer = DeliveryRequestSerializer(data=request.data)   
        if serializer.is_valid():
                serializer.save()  
                # send delivery request to delivery service  
                data = {
                        'product_id': product.id,
                        'owner_id': product.user.id,
                        'status': 'pending',
                        'requestid': serializer.data['id'],
                }
                res = requests.post('http://app:8080/api/add', json=data , headers={'Content-Type': 'application/json'})  
                if res.status_code == 200:
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@permission_required('api.can_execute_delivery_requests' , raise_exception=True)
def executeDeliveryRequest(request, pk ):
        stat = request.data['status']
        # get delivery request
        try:
                delivery_request = DeliveryRequest.objects.get(id=pk)
                # update delivery request status
                delivery_request.status = stat
                delivery_request.save()
                data = {
                        'status': stat,
                }
                # send delivery request to delivery service
                res = requests.put(f'http://app:8080/api/update/{pk}', json=data , headers={'Content-Type': 'application/json'})
                if res.status_code == 200:
                        return Response({'message':'Delivery request updated successfully'} , status=status.HTTP_200_OK)
                else:
                        return Response({'message':'Delivery request failed to update'} , status=status.HTTP_400_BAD_REQUEST) 
                
        except DeliveryRequest.DoesNotExist:
                return Response({'message':'Delivery request does not exist'} , status=status.HTTP_404_NOT_FOUND)
        


@api_view(['GET'])
def getAllDeliveryRequests(request):
        delivery_requests = DeliveryRequest.objects.all()
        serializer = DeliveryRequestSerializer(delivery_requests , many=True)
        return Response(serializer.data)