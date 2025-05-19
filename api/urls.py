from django.urls import path
from .views import *
from .api_venue_details import api_venues_data  

urlpatterns = [
    path('venues/', api_venues_data, name="venue_api"),
]