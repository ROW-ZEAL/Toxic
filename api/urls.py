from django.urls import path
from .views import *
from .api_venue_details import api_venues_data  

urlpatterns = [
    path('venues/', api_venues_data, name="venue_api"),
    # path('list/', show_venue_list, name="api"),
    path('owner/<str:ownerName>/', show_venue_list, name='api'),
    path('slots/', api_slots_data, name='api'),
    path('catrogry/', show_sports_category, name='api'),
    path('<str:VenueName>/', show_venue_details, name='api'),
    path('filter/<int:venueid>/', fetch_filtered_venue_details, name='api'),
    path('checkslots/<str:venue>/<str:start>/<str:end>/', check_booking_slots, name='api'),


]