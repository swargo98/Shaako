from django.urls import path, include
from . import viewsSaha

urlpatterns = [
    path('organization/getCampaignList', viewsSaha.getCampaignList),
    path('organization/getCampaignStat', viewsSaha.getCampaignStat),
    path('organization/getImage', viewsSaha.getOrganizationAdminImage),
    path('organization/pictureUpdate', viewsSaha.adminPictureUpdate),
    path('organization/getDiseaseStat', viewsSaha.getDiseaseStat),
    path('organization/getFilterDiseaseStat', viewsSaha.getFilterDiseaseStat),
    path('organization/getCampaignDetails', viewsSaha.getCampaignDetails),

    path('organization/getSupervisorRecruitmentStat', viewsSaha.getSupervisorRecruitmentStat),
    path('organization/getCHWRecruitmentStat', viewsSaha.getCHWRecruitmentStat),
    path('organization/getSupervisorCHW', viewsSaha.getSupervisorCHW),
    path('organization/searchSupervisorCHW', viewsSaha.searchSupervisorCHW),
    path('organization/getCHWProfile', viewsSaha.getCHWProfile),
    path('organization/getRecentVisits', viewsSaha.getRecentVisits),

    path('supervisor/editContent', viewsSaha.editLesson),
    path('supervisor/home', viewsSaha.supervisorHome),
    path('supervisor/getProfile', viewsSaha.getSupervisorProfile),
    path('supervisor/updateSupervisorProfile', viewsSaha.updateSupervisorProfile),

    path('CHW/getLessonList', viewsSaha.getLessonList),
    path('CHW/addPatient', viewsSaha.addPatient),
    path('CHW/getPastQuiz', viewsSaha.getPastQuiz),
    path('CHW/getImage', viewsSaha.getCHWImage),
    path('CHW/getRecentQuizSubmissions', viewsSaha.getRecentQuizSubmissions),
    path('CHW/updateCHWProfile', viewsSaha.updateCHWProfile),
    path('patient/getPatientImage', viewsSaha.getPatientImage),
]
