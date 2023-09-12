from .models import Product, User
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required,permission_required,user_passes_test
from .serializers import ProductSerializer
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
@login_required(login_url='login')
@permission_classes([IsAuthenticated])
def protectedView(request):
    return Response({'message':'You are authorized to view this page'})


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
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
        else:
                return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data , status=status.HTTP_201_CREATED)




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


