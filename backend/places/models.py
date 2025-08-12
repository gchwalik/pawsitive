from django.db.models import Model, CharField, DateTimeField, ForeignKey, PROTECT
from django.core.exceptions import ValidationError

class Place(Model):
    # Default id field automatically created
    created = DateTimeField(auto_now_add=True, editable=False) # added editable=False for clarity
    updated = DateTimeField(auto_now=True, editable=False) # added editable=False for clarity
    name = CharField(max_length=200)

    # type = ForeignKey("PlaceType", on_delete=PROTECT, related_name="places", related_query_name="place")

    def __str__(self):
        return self.name


class PlaceType(Model):
    # Default id field automatically created
    created = DateTimeField(auto_now_add=True, editable=False) # added editable=False for clarity
    updated = DateTimeField(auto_now=True, editable=False) # added editable=False for clarity
    name = CharField(max_length=200)

    # many-to-one reference to Place

    def __str__(self):
        return self.name
