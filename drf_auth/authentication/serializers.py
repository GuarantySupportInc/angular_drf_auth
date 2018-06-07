from rest_framework import serializers

from .models import GuestbookEntry

class GuestbookEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestbookEntry
        fields = '__all__'
