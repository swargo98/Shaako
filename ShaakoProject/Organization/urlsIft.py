from django.urls import path, include
from . import viewsIft
urlpatterns = [
    path('supervisor/login', viewsIft.supervisorlogin),
    path('supervisor/getCHW', viewsIft.supGetCHWList),
    path('supervisor/searchCHW', viewsIft.searchCHW),
]
