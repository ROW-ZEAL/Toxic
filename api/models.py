from django.db import models
from django.conf import settings

class Venue(models.Model):
    VENUE_TYPES = [
        ('Indoor', 'Indoor'),
        ('Outdoor', 'Outdoor'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    capacity = models.IntegerField()
    type = models.CharField(max_length=20, choices=VENUE_TYPES, default='Indoor')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='venues')
    facilities = models.JSONField(default=list)
    sport_categories = models.JSONField(default=list)
    photos = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']
