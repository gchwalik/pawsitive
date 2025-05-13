from datetime import datetime

from django.db import models

class Place(models.Model):
    # Default id field automatically created
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=200)
    place_type = models.ForeignKey('PlaceType', blank=False, null=True ,on_delete=models.RESTRICT, related_name='places')

    def __str__(self):
        return f"Place(name={self.name}, type={ getattr(self,"place_type",None) })"


class PlaceType(models.Model):
    # Default id field automatically created
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=200, unique=True)
    help_text = "Category of place: Park, Hiking Trail, etc.)"

    def __str__(self):
        return self.name
