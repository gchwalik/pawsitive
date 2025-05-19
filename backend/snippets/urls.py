from django.urls import path
from snippets import views


app_name = "places"
urlpatterns = [
    path('', views.snippet_list),
    path('<int:pk>/', views.snippet_detail),
]