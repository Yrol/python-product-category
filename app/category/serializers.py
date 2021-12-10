from rest_framework import serializers
from core.models import Category
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'url', 'name', 'description']
        read_only_fields = ('id',)

