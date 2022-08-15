from django.urls import path, include
from . import viewsSaha

urlpatterns = [
    path('organization/getCampaignList', viewsSaha.getCampaignList),
    path('supervisor/editContent', viewsSaha.editLesson),
    path('supervisor/home', viewsSaha.supervisorHome),

    path('CHW/getLessonList', viewsSaha.getLessonList),
    path('CHW/addCHW', viewsSaha.addCHW),
    path('CHW/getPastQuiz', viewsSaha.getPastQuiz),
    path('CHW/getImage', viewsSaha.getCHWImage),
]
