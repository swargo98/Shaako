from django.urls import path, include
from . import views, views2

urlpatterns = [
    path('organization/login', views.login),
    path('organization/home', views.home),
    path('organization/searchSupervisor', views.searchSupervisor),
    path('organization/getSupervisor', views.getSupervisor),
    path('organization/fetchLocationSupervisor', views.fetchLocationSupervisor),
    path('organization/updateSupervisor', views.updateSupervisor),
    path('organization/deleteSupervisor', views.deleteSupervisor),
    path('organization/createSupervisor', views.createSupervisor),
    path('organization/getSupervisorDetailed', views.getSupervisorDetailed),
    path('organization/getUnionsOfSupervisor', views.getUnionsOfSupervisor),
    path('organization/getAssignableSupervisor', views.getAssignableSupervisor),
    path('organization/changeSupervisorOfCHW', views.changeSupervisorOfCHW),
    path('organization/image/supervisor', views.getSupervisorImage),
    path('supervisor/addContent', views.addContent),
    path('supervisor/getL', views.getL),
    path('supervisor/getMyContent', views.getMyContent),
    


    path('organization/getCHW', views.getCHW),
    path('organization/createCHW', views.createCHW),
    path('organization/searchCHW', views.searchCHW),
    path('organization/deleteCHW', views.deleteCHW),

    path('organization/createCampaign', views2.createCampaign),
    # path('organization/getCampaign', views2.getCampaign),


]
