from django.urls import path, include
from . import viewsSaha

urlpatterns = [
    path('organization/getCampaignList', viewsSaha.getCampaignList),
    path('organization/getImage', viewsSaha.getOrganizationAdminImage),
    path('organization/pictureUpdate', viewsSaha.adminPictureUpdate),


    path('supervisor/editContent', viewsSaha.editLesson),
    path('supervisor/home', viewsSaha.supervisorHome),
    path('supervisor/getProfile', viewsSaha.getSupervisorProfile),
    path('supervisor/updateSupervisorProfile', viewsSaha.updateSupervisorProfile),


    path('CHW/getLessonList', viewsSaha.getLessonList),
    path('CHW/addPatient', viewsSaha.addPatient),
    path('CHW/getPastQuiz', viewsSaha.getPastQuiz),
    path('CHW/getImage', viewsSaha.getCHWImage),
]
