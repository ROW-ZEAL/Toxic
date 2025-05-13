from django.contrib import admin
from account.models import User
from django.utils.html import format_html
from django.urls import path
from django.shortcuts import render

class UserModelAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'admin_status', 'created_at']
    list_filter = ['is_admin', 'is_admin_requested', 'is_admin_approved']
    search_fields = ['email', 'name']
    ordering = ['-created_at']

    change_list_template = 'admin/user/change_list.html'

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('admin-requests/', self.admin_request_view, name='admin-requests'),
        ]
        return custom_urls + urls

    def admin_request_view(self, request):
        # Get all users who have requested admin access
        admin_requests = User.objects.filter(is_admin_requested=True, is_admin_approved=False)
        context = {
            'admin_requests': admin_requests,
            'title': 'Admin Requests',
            'opts': self.model._meta,
        }
        return render(request, 'admin/user/admin_requests.html', context)

    def get_fieldsets(self, request, obj=None):
        if obj and obj.is_admin_requested and not obj.is_admin_approved:
            # For admin requests
            return (
                ('User Information', {'fields': ('email', 'name')}),
                ('Admin Request', {
                    'fields': ('is_admin_approved',),
                    'description': 'Approve or reject admin request'
                }),
            )
        # For regular users
        return (
            ('User Information', {'fields': ('email', 'name', 'password')}),
            ('Status', {'fields': ('is_admin', 'is_active')}),
        )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # If editing an existing object
            return ['email', 'name', 'password'] if obj.is_admin_requested else ['password']
        return []

    def admin_status(self, obj):
        if obj.is_admin:
            return format_html('<span style="color: green;">Admin</span>')
        elif obj.is_admin_approved:
            return format_html('<span style="color: blue;">Approved</span>')
        elif obj.is_admin_requested:
            return format_html('<span style="color: orange;">Pending Approval</span>')
        return format_html('<span style="color: gray;">Regular User</span>')
    
    admin_status.short_description = 'Status'

    def save_model(self, request, obj, form, change):
        # If admin is being approved
        if 'is_admin_approved' in form.changed_data and obj.is_admin_approved:
            obj.is_admin = True  # Automatically set is_admin when approved
        super().save_model(request, obj, form, change)


# Register models with the admin site
admin.site.register(User, UserModelAdmin)