from django.urls import path, include
from rest_framework.routers import DefaultRouter

from places import views

# app_name = "places"
# urlpatterns = [
#     path("", views.PlaceListView.as_view(), name="index"),
#     path("<int:pk>/", views.PlaceDetailView.as_view(), name="place_read"),
#     path("create/", views.PlaceCreateView.as_view(), name="place_create"),
#     path("<int:pk>/edit/", views.PlaceUpdateView.as_view(), name="place_update"),
#     path("<int:pk>/delete/", views.PlaceDeleteView.as_view(), name="place_delete"),
# ]
router = DefaultRouter()
router.register(r'places', views.PlaceViewSet, basename='place')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]


"""
view places list
create new place 
edit place
delete place

"""