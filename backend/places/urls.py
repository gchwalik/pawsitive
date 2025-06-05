from django.urls import path, include
from rest_framework.routers import DefaultRouter

from places import views

router = DefaultRouter()
router.register(r'places', views.PlaceViewSet, basename='place')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
