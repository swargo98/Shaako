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
    
    
]
