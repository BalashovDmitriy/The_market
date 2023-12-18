from django.urls import path
from rest_framework import routers

from ads.views import AdViewSet, CommentViewSet, AdMyListAPIView
from rest_framework_nested.routers import NestedDefaultRouter

router = routers.DefaultRouter()
router.register(r'ads', AdViewSet)

ads_router = NestedDefaultRouter(router, r'ads', lookup='ad')
ads_router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('ads/me/', AdMyListAPIView.as_view(), name='ad-my-list'),
]

urlpatterns += router.urls
urlpatterns += ads_router.urls
