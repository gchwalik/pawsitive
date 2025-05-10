from django.urls import path

from . import views

app_name = "places"
urlpatterns = [
    path("", views.PlaceListView.as_view(), name="index"),
    # path("<int:pk>/", views.DetailView.as_view(), name="detail"),
]


"""
view places list
create new place 
edit place
delete place

"""