from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def api_venues_data(request):
    print("=== Received Form Data ===")
    for key, value in request.data.items():
        print(f"{key}: {value}")

    print("\n=== Facilities ===")
    for key in request.data:
        if key.startswith("facilities["):
            print(f"{key}: {request.data[key]}")

    print("\n=== Sport Categories ===")
    for key in request.data:
        if key.startswith("sportCategories["):
            print(f"{key}: {request.data[key]}")

    print("\n=== Uploaded Photos ===")
    if 'photos' in request.FILES:
        for photo in request.FILES.getlist('photos'):
            print(f"Photo: {photo.name}")

    return Response({"message": "Form data received and printed successfully."}, status=status.HTTP_200_OK)
