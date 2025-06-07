from rest_framework.decorators import api_view
from rest_framework.response import Response
from .api_sports_category import *
from .api_venue_details import api_venues_data
from .api_venue_data import *
from .api_slots_details import *
from .api_sports_venue_details import *
from .api_booking_slots import *
from .booking_schedule import *

@api_view(['GET'])
def show_sports_category(request):
    return Response(api_show_sports_category(request=request))

@api_view(['GET'])
def show_venue_list(request,ownerName):
    return Response(api_show_venue_list(ownerName))

@api_view(['GET'])
def show_venue_details(request,VenueName):
    return Response(api_show_venue_detail(VenueName))

@api_view(['GET'])
def check_booking_slots(request, venue, start, end):
    start = start.strip()
    end = end.strip()
    data = api_slot_availability(venue, start, end)
    return Response(data)



@api_view(['GET'])
def fetch_filtered_venue_details(request,venueid):
    return Response(filter_venue_details(venueid))
    


# Call the full logic from api_venue_details
@api_view(['POST'])
def api_venues_data(request):
    return api_venues_data(request)

@api_view(['POST'])
def api_slots_data(request):
    return show_slots_list(request.data)

