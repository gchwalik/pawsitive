from django.urls import path

from . import views

app_name = "places"
urlpatterns = [
    path("", views.PlaceListView.as_view(), name="index"),
    path("create/", views.PlaceCreateView.as_view(), name="place_create"),
    path("<int:pk>/", views.PlaceUpdateView.as_view(), name="place_update"),
    path("<int:pk>/delete", views.PlaceDeleteView.as_view(), name="place_delete"),
]


"""
view places list
create new place 
edit place
delete place

"""