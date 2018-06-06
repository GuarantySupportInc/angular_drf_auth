from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def logged_in_check(request, format=None):
    content = {
        'status': 'request was permitted'
    }
    return Response(content)
