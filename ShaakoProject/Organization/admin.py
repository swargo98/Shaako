from django.contrib import admin

# register Organization
from .models import *
admin.site.register(Organization)
admin.site.register(OrganizationAdmin)
admin.site.register(Location)
admin.site.register(Notification)
admin.site.register(Supervisor)
admin.site.register(Campaign)
admin.site.register(Location_Campaign)
admin.site.register(Supervisor_Campaign)
admin.site.register(CHW)
admin.site.register(Patient)
admin.site.register(PatientCampaign)
admin.site.register(VisitForm)
admin.site.register(Lesson)

