from django.urls import path, include
from . import viewsIft
urlpatterns = [
    path('supervisor/login', viewsIft.supervisorlogin),
    path('supervisor/getCHW', viewsIft.supGetCHWList),
    path('supervisor/searchCHW', viewsIft.searchCHW),
    path('supervisor/addNewQuiz', viewsIft.addNewQuiz),
    path('supervisor/getQ', viewsIft.getQ),
    path('supervisor/getMyQuiz', viewsIft.getMyQuiz),
    path('chw/kichuekta', viewsIft.kichuekta),
    path('chw/login', viewsIft.chwlogin),
    path('chw/getNosContent', viewsIft.getNosContent),
    path('chw/getQuizSubmission', viewsIft.getQuizSubmission),
    path('chw/submitQuiz', viewsIft.submitQuiz),
    path('chw/getNotification', viewsIft.getNotification),
    path('chw/getPatientList', viewsIft.getPatientList),
    path('patient/getPatientImage', viewsIft.getPatientImage),
    path('CHW/getAllCampaigns', viewsIft.getAllCampaigns),
    path('CHW/Campaign/getUnenrolledPatient', viewsIft.getUnenrolledPatient),
    path('CHW/enrollCHW', viewsIft.enrollCHW),
    path('CHW/makeReadNotification', viewsIft.makeReadNotification),
    path('CHW/getSchedule', viewsIft.getSchedule),
    path('chw/mark_lesson_read', viewsIft.mark_lesson_read),
    
    
]
