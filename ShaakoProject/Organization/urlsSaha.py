from django.urls import path, include
from . import viewsSaha

urlpatterns = [
    path('organization/getCampaignList', viewsSaha.getCampaignList),
]
