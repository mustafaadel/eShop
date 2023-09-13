# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    class Meta:
        permissions = [
            ('can_view_all_products' , 'Can view all products'),
            ('can_add_product' , 'Can add product'),
            ('can_edit_product' , 'Can edit product'),
            ('can_delete_product' , 'Can delete product'),
            ('can_make_delivery_requests' , 'Can make delivery requests'),
            ('can_execute_delivery_requests' , 'Can execute delivery requests'),
        ]
        
    

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User , on_delete=models.CASCADE)


class DeliveryRequest(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # delivery_address = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='pending')
    

    def __str__(self):
        return f'Delivery Request #{self.id}'