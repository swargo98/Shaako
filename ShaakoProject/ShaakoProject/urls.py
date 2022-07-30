from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Organization.urls')),
    path('', include('Organization.urlsSwargo')),
    path('', include('Organization.urlsIft')),
    path('', include('Organization.urlsSaha')),
]
