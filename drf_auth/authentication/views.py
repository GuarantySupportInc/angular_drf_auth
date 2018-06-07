from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import GuestbookEntry
from .serializers import GuestbookEntrySerializer

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def logged_in_check(request, format=None):
    content = {
        'status': 'request was permitted'
    }
    return Response(content)

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated, ))
def guestbook_entries(request):
    """
    List all guestbook entries or create a new one
    """
    if request.method == 'GET':
        entries = GuestbookEntry.objects.all()
        serializer = GuestbookEntrySerializer(entries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GuestbookEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
