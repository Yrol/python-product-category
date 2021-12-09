from django.db import models
import datetime

# Create your models here.
class Category(models.Model):
     """Category model"""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return "%s %s" % (self.name, self.description)

class Product(models.Model):
    """Product model"""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    manufacturing_date = models.DateField(_("Date"), default=datetime.date.today)
    price = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE
    )

    def __str__(self):
        return "%s %s %s" % (self.name, self.description, self.manufacturing_date, self.price, self.category)
