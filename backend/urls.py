from django.contrib import admin
from django.urls import path, include
from account.views import AdminRegistrationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('api/', include('api.urls')),
    path('api/admin/register/', AdminRegistrationView.as_view(), name='admin-register'),
]