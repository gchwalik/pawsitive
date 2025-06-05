from django.db.models import CharField, DateTimeField, Model

class Place(Model):
    # Default id field automatically created
    created = DateTimeField(auto_now_add=True, editable=False) # added editable=False for clarity
    updated = DateTimeField(auto_now=True, editable=False) # added editable=False for clarity
    name = CharField(max_length=200)

    def __str__(self):
        return self.name
