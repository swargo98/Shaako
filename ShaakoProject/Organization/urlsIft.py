from django.urls import path, include
from . import viewsIft
urlpatterns = [
    path('supervisor/login', viewsIft.supervisorlogin),
]
