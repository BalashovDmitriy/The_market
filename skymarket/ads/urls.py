from django.urls import include, path
from rest_framework import routers

from skymarket.ads.views import AdViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(r'ads', AdViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [

]

urlpatterns += router.urls
