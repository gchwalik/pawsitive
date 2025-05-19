from django.urls import path

from . import views

app_name = "places"
urlpatterns = [
    path("", views.PlaceListView.as_view(), name="index"),
    path("<int:pk>/", views.PlaceDetailView.as_view(), name="place_read"),
    path("create/", views.PlaceCreateView.as_view(), name="place_create"),
    path("<int:pk>/edit/", views.PlaceUpdateView.as_view(), name="place_update"),
    path("<int:pk>/delete/", views.PlaceDeleteView.as_view(), name="place_delete"),
]

api_patterns = ([
    path("", views.PlaceListAPIView.as_view(), name="index"),
    path("<int:pk>/", views.PlaceDetailAPIView.as_view(), name="detail"),
], "places_apis")  # (urlpatterns, app_name)

# Include API patterns under /api/
urlpatterns += [
    path("apis/", include(api_patterns)),
]


"""
view places list
create new place 
edit place
delete place

"""