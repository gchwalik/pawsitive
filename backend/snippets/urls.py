from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from snippets import views


app_name = "snippets"
urlpatterns = [
    path('', views.SnippetList.as_view(), name='index'),
    path('<int:pk>/', views.SnippetDetail.as_view(), name='detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
