from django.urls import include, path
from rest_framework.routers import DefaultRouter

#from category import views
from product.views import ProductViewSet

router = DefaultRouter()
router.register('product', ProductViewSet)

app_name = 'product'

urlpatterns = [
    path('', include(router.urls)),
]