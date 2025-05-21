from rest_framework.decorators import api_view
from rest_framework.response import Response
from .api_sports_category import *
from .api_venue_details import api_venues_data
from .api_venue_data import *

@api_view(['GET'])
def show_sports_category(request):
    return Response(api_show_sports_category(request=request))

@api_view(['GET'])
def show_venue_list(request,ownerName):
    return Response(api_show_venue_list(ownerName))


# Call the full logic from api_venue_details
@api_view(['POST'])
def api_venues_data(request):
    return api_venues_data(request)
