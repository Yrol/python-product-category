from django.urls import include, path
from rest_framework.routers import DefaultRouter

#from category import views
from category.views import CategoryViewSet

router = DefaultRouter()
router.register('category', CategoryViewSet)

app_name = 'category'

urlpatterns = [
    path('', include(router.urls)),
]