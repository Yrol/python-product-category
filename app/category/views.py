from rest_framework import viewsets, mixins
from core.models import Category
from category import serializers

class CategoryViewSet(viewsets.ModelViewSet, mixins.ListModelMixin):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer

    