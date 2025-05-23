from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from rest_framework import viewsets

from .models import Place
from .serializers import PlaceSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


# @method_decorator(csrf_protect, name='dispatch')
# class PlaceListView(ListView):
#     model = Place
#     template_name = "places/index.html"
#     context_object_name = "places"

# class PlaceDetailView(DetailView):
#     model = Place

# class PlaceCreateView(CreateView):
#     model = Place
#     fields = ["name"]
#     success_url = reverse_lazy('places:index')

#     def get_context_data(self, **kwargs):
#         # Call the base implementation first to get a context
#         context = super().get_context_data(**kwargs)
#         context["page_title"] = "Create Place"
#         context["btn_txt"] = "Create"
#         return context

# class PlaceUpdateView(UpdateView):
#     model = Place
#     fields = ["name"]
#     success_url = reverse_lazy('places:index')

#     def get_context_data(self, **kwargs):
#         # Call the base implementation first to get a context
#         context = super().get_context_data(**kwargs)
#         context["page_title"] = "Update Place"
#         context["btn_txt"] = "Update"
#         return context

# class PlaceDeleteView(DeleteView):
#     model = Place
#     template_name = "places/place_confirm_delete.html"
#     success_url = reverse_lazy('places:index')
