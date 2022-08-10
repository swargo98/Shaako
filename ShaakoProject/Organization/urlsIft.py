from django.urls import path, include
from . import viewsIft
urlpatterns = [
    path('supervisor/login', viewsIft.supervisorlogin),
    path('supervisor/getCHW', viewsIft.supGetCHWList),
    path('supervisor/searchCHW', viewsIft.searchCHW),
    path('supervisor/addNewQuiz', viewsIft.addNewQuiz),
    path('supervisor/getQ', viewsIft.getQ),
    path('supervisor/getMyQuiz', viewsIft.getMyQuiz),
    
]
