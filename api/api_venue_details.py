from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Venue
from django.contrib.auth import get_user_model
from django.core.files.storage import default_storage
import json

User = get_user_model()

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def api_venues_data(request):
    try:
        print("=== Received Form Data ===")
        print("Request data:", dict(request.data))
        print("Request files:", request.FILES)

        # Get user by email if provided
        owner_email = request.data.get('ownerEmail')
        print(f"Owner email: {owner_email}")
        if not owner_email:
            return Response({
                'error': 'Owner email is required'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=owner_email)
            print(f"Found user: {user}")
        except User.DoesNotExist:
            return Response({
                'error': 'User with this email does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Extract basic venue data
        venue_data = {
            'name': request.data.get('name'),
            'location': request.data.get('location'),
            'capacity': request.data.get('capacity'),
            'type': request.data.get('type'),
            'status': request.data.get('status'),
            'price': request.data.get('price'),
            'description': request.data.get('description'),
        }
        print("Venue data:", venue_data)

        # Extract facilities and sport categories
        facilities = []
        sport_categories = []
        
        for key in request.data:
            if key.startswith("facilities["):
                facilities.append(request.data[key])
            elif key.startswith("sportCategories["):
                sport_categories.append(request.data[key])
        print("Facilities:", facilities)
        print("Sport categories:", sport_categories)

        # Handle photos
        photos = []
        if 'photos' in request.FILES:
            print("Found photos")
            print("Photo files:", request.FILES.getlist('photos'))
            for photo in request.FILES.getlist('photos'):
                print(f"Processing photo: {photo.name}")
                print("Photo content type:", photo.content_type)
                print("Photo size:", photo.size)
                # Generate a unique filename to avoid conflicts
                filename = f'venues/photos/{photo.name}'
                print("Saving to path:", filename)
                # Save the file using Django's storage system
                saved_path = default_storage.save(filename, photo)
                print(f"Saved photo to: {saved_path}")
                # Store the relative path in the database
                photos.append(saved_path)
        else:
            print("No photos found in request.FILES")
        print("Photos paths:", photos)

        # Create and save the venue
        venue = Venue.objects.create(
            **venue_data,
            owner=user,  # Pass the User instance directly
            facilities=facilities,
            sport_categories=sport_categories,
            photos=photos
        )
        print(f"Created venue: {venue}")

        return Response({
            "message": "Venue created successfully",
            "venue_id": venue.id
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "message": "Venue created successfully",
            "venue_id": venue.id
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
