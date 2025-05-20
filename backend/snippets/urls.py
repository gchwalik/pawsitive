from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from snippets import views


app_name = "snippets"
urlpatterns = [
    path('', views.api_root),
    path('index/', views.SnippetList.as_view(), name='snippet_list'),
    path('<int:pk>/', views.SnippetDetail.as_view(), name='snippet_detail'),
    path('<int:pk>/highlight/', views.SnippetHighlight.as_view(), name='snippet_highlight'),
    path('users/', views.UserList.as_view(), name='user_list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user_detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
