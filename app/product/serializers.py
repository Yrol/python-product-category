from rest_framework import serializers
from core.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['pk', 'url', 'name', 'description', 'category']
        read_only_fields = ('pk',)

