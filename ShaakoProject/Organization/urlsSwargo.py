from django.urls import path, include
from . import viewsSwargo

urlpatterns = [
    path('organization/profile', viewsSwargo.getProfile),
    path('organization/profileUpdate', viewsSwargo.updateProfile),

]
