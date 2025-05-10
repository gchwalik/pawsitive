from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from .models import Place


@method_decorator(csrf_protect, name='dispatch')
class PlaceListView(ListView):
    model = Place
    template_name = "places/index.html"
    context_object_name = "places"

    # def get_queryset(self):
    #     return Place.objects.all()

# class PlaceDetailView(DetailView):
#     model = Place
#     template_name = "places/place_details.html"
#     context_object_name = "place"

# class PlaceCreateView(CreateView):
#     model = Place
#     fields = ["name"]

class PlaceUpdateView(UpdateView):
    model = Place
    fields = ["name"]
    template_name_suffix = "_details"
    success_url = reverse_lazy('places:index')

# class PlaceDeleteView(DeleteView):
#     model = Place
#     template_name = "places/place_confirm_delete.html"
#     success_url = "/places/"
