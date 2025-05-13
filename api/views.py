from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .api_sports_category import *

# Create your views here.



@api_view(['Get'])
def show_sports_category(request):
    return Response(api_show_sports_category(request=request))