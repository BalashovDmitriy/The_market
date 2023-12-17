from django.urls import path
from rest_framework import routers

from ads.views import AdViewSet, CommentViewSet, AdMyListAPIView

router = routers.DefaultRouter()
router.register(r'ads', AdViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('ads/me/', AdMyListAPIView.as_view(), name='ad-my-list'),
]

urlpatterns += router.urls
