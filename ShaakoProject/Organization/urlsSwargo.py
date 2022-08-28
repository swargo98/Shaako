from django.urls import path, include
from . import viewsSwargo

urlpatterns = [
    path('organization/profile', viewsSwargo.getProfile),
    path('organization/profileUpdate', viewsSwargo.updateProfile),
    path('chw/symptomsList', viewsSwargo.getSymptomsList),
    path('chw/getPrediction', viewsSwargo.getPrediction),
    path('chw/saveVisitForm', viewsSwargo.addVisitForm),
    path('chw/patientProfile', viewsSwargo.getPatientProfile),
    path('chw/prevVisitForm', viewsSwargo.getPrevVisitForm),

]
