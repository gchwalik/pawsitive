from rest_framework import viewsets
from rest_framework.decorators import action 
from rest_framework.response import Response

from .models import Place, PlaceType
from .serializers import PlaceSerializer, PlaceTypeSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    """
    This ViewSet automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


# class PlaceTypeViewSet(viewsets.ModelViewSet):
#     """
#     This ViewSet automatically provides `list`, `create`, `retrieve`,
#     `update` and `destroy` actions.
#     """
#     queryset = PlaceType.objects.all()
#     serializer_class = PlaceTypeSerializer
#     pagination_class = None  # Disables pagination

#     # Adds GET endpoint for place_type/{id}/places
#     @action(detail=True, methods=['get'])
#     def places(self, request, pk=None):
#         """Get all places for this place type"""
#         place_type = self.get_object()
#         places = place_type.places.all()

#         serializer = PlaceSerializer(places, many=True)
#         return Response(serializer.data)
