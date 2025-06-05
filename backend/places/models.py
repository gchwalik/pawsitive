from django.db import models

class Place(models.Model):
    # Default id field automatically created
    created = models.DateTimeField(auto_now_add=True, editable=False) # added editable=False for clarity
    updated = models.DateTimeField(auto_now=True, editable=False) # added editable=False for clarity
    name = models.CharField(max_length=200)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
