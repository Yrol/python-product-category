from rest_framework import serializers
from core.models import Product
from core.models import Category

class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.name')

    class Meta:
        model = Product
        fields = ['pk', 'url', 'name', 'description', 'manufacturing_date', 'category_name', 'category']
        read_only_fields = ('pk',)

