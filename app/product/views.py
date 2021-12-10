from rest_framework import viewsets, mixins
from core.models import Product
from product import serializers

class ProductViewSet(viewsets.ModelViewSet, mixins.ListModelMixin):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer

    