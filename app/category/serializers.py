from rest_framework import serializers
from core.models import Category
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    products = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='product:product-detail')
    class Meta:
        model = Category
        fields = ['pk', 'url', 'name', 'description', 'products']
        read_only_fields = ('pk',)

