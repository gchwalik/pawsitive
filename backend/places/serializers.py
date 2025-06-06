from rest_framework import serializers
from places.models import Place, PlaceType


# For nested use in Place
class PlaceTypeMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceType
        fields = ['id', 'name']


class PlaceSerializer(serializers.ModelSerializer):
    type = PlaceTypeMinimalSerializer(read_only=True)
    type_id = serializers.PrimaryKeyRelatedField(
        queryset=PlaceType.objects.all(),
        source='type',
        write_only=True
    )

    class Meta:
        model = Place
        fields = ['id', 'name', 'type', 'type_id', 'created', 'updated']


class PlaceTypeSerializer(serializers.ModelSerializer):
    place_count = serializers.SerializerMethodField()

    class Meta:
        model = PlaceType
        fields = ['id', 'name', 'created', 'updated', 'place_count']

    def get_place_count(self, obj):
        return obj.places.count()
