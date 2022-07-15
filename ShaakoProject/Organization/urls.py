from django.urls import path, include
from . import views

urlpatterns = [
    path('organization/login', views.login),

    path('organization/list', views.OrganizationList.as_view()),
    path('organization/create', views.OrganizationCreate.as_view()),
    path('organization/delete/<int:id>', views.OrganizationDestroy.as_view()),

    path('OrganizationAdmin/list', views.OrganizationAdminList.as_view()),
    path('OrganizationAdmin/create', views.OrganizationAdminCreate.as_view()),
    path('OrganizationAdmin/delete/<int:id>', views.OrganizationAdminDestroy.as_view()),

    path('Location/list', views.LocationList.as_view()),
    path('Location/create', views.LocationCreate.as_view()),
    path('Location/delete/<int:id>', views.LocationDestroy.as_view()),

    path('Notification/list', views.NotificationList.as_view()),
    path('Notification/create', views.NotificationCreate.as_view()),
    path('Notification/delete/<int:id>', views.NotificationDestroy.as_view()),

    path('Supervisor/list', views.SupervisorList.as_view()),
    path('Supervisor/create', views.SupervisorCreate.as_view()),
    path('Supervisor/delete/<int:id>', views.SupervisorDestroy.as_view()),

    path('Campaign/list', views.CampaignList.as_view()),
    path('Campaign/create', views.CampaignCreate.as_view()),
    path('Campaign/delete/<int:id>', views.CampaignDestroy.as_view()),

    path('Location_Campaign/list', views.Location_CampaignList.as_view()),
    path('Location_Campaign/create', views.Location_CampaignCreate.as_view()),
    path('Location_Campaign/delete/<int:id>', views.Location_CampaignDestroy.as_view()),

    path('Supervisor_Campaign/list', views.Supervisor_CampaignList.as_view()),
    path('Supervisor_Campaign/create', views.Supervisor_CampaignCreate.as_view()),
    path('Supervisor_Campaign/delete/<int:id>', views.Supervisor_CampaignDestroy.as_view()),

    path('CHW/list', views.CHWList.as_view()),
    path('CHW/create', views.CHWCreate.as_view()),
    path('CHW/delete/<int:id>', views.CHWDestroy.as_view()),

    path('Patient/list', views.PatientList.as_view()),
    path('Patient/create', views.PatientCreate.as_view()),
    path('Patient/delete/<int:id>', views.PatientDestroy.as_view()),

    path('PatientCampaign/list', views.PatientCampaignList.as_view()),
    path('PatientCampaign/create', views.PatientCampaignCreate.as_view()),
    path('PatientCampaign/delete/<int:id>', views.PatientCampaignDestroy.as_view()),

    path('VisitForm/list', views.VisitFormList.as_view()),
    path('VisitForm/create', views.VisitFormCreate.as_view()),
    path('VisitForm/delete/<int:id>', views.VisitFormDestroy.as_view()),

    path('Lesson/list', views.LessonList.as_view()),
    path('Lesson/create', views.LessonCreate.as_view()),
    path('Lesson/delete/<int:id>', views.LessonDestroy.as_view()),

    path('Quiz/list', views.QuizList.as_view()),
    path('Quiz/create', views.QuizCreate.as_view()),
    path('Quiz/delete/<int:id>', views.QuizDestroy.as_view()),

    path('QuizItem/list', views.QuizItemList.as_view()),
    path('QuizItem/create', views.QuizItemCreate.as_view()),
    path('QuizItem/delete/<int:id>', views.QuizItemDestroy.as_view()),

    path('Lesson_CHW/list', views.Lesson_CHWList.as_view()),
    path('Lesson_CHW/create', views.Lesson_CHWCreate.as_view()),
    path('Lesson_CHW/delete/<int:id>', views.Lesson_CHWDestroy.as_view()),

    path('QuizSubmission/list', views.QuizSubmissionList.as_view()),
    path('QuizSubmission/create', views.QuizSubmissionCreate.as_view()),
    path('QuizSubmission/delete/<int:id>', views.QuizSubmissionDestroy.as_view()),

    path('SubmissionItem/list', views.SubmissionItemList.as_view()),
    path('SubmissionItem/create', views.SubmissionItemCreate.as_view()),
    path('SubmissionItem/delete/<int:id>', views.SubmissionItemDestroy.as_view()),
]
