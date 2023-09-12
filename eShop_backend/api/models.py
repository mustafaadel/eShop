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
        ]
        
    

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    