from django.db import models
from datetime import datetime


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return '%s %s' % (self.name, self.description)


class Product(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    manufacturing_date = models.DateField(default=datetime.now)
    price = models.CharField(max_length=255)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)

    def __str__(self):
        return '%s %s %s %s' % (self.name, self.description,
                             self.manufacturing_date, 
                             self.price,
                             self.category)
