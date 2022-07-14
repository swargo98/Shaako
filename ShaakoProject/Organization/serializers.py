from rest_framework import serializers
from .models import *


# Organization
class OrganizationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'officeAddress', 'contactNo']


# Organization Admin
class OrganizationAdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrganizationAdmin
        fields = ['id', 'organization', 'name', 'password', 'email', 'contactNo', 'presentAddress', 'imagePath']


# Location
class LocationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'division', 'district', 'upazilla_thana', 'ward_union']


# Notification
class NotificationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'timestamp', 'description', 'notification_type', 'type_id', 'is_read']


# Supervisor
class SupervisorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Supervisor
        fields = ['id', 'organization', 'name', 'password', 'email', 'contactNo', 'presentAddress', 'imagePath']


# Campaign
class CampaignSerializers(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ['id', 'title', 'state_date', 'end_date', 'campaign_details', 'goal']


# Location_Campaign
class Location_CampaignSerializers(serializers.ModelSerializer):
    class Meta:
        model = Location_Campaign
        fields = ['id', 'location', 'campaign']


# Supervisor_Campaign
class Supervisor_CampaignSerializers(serializers.ModelSerializer):
    class Meta:
        model = Supervisor_Campaign
        fields = ['id', 'supervisor', 'campaign']


# CHW
class CHWSerializers(serializers.ModelSerializer):
    class Meta:
        model = CHW
        fields = ['id', 'supervisor', 'name', 'password', 'email', 'contactNo', 'presentAddress', 'imagePath',
                  'location']


# Patient
class PatientSerializers(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'address', 'contactNo', 'date_of_birth', 'gender']


# PatientCampaign
class PatientCampaignSerializers(serializers.ModelSerializer):
    class Meta:
        model = PatientCampaign
        fields = ['id', 'patient', 'campaign', 'chw', 'enrollment_date']


# VisitForm
class VisitFormSerializers(serializers.ModelSerializer):
    class Meta:
        model = VisitForm
        fields = ['id', 'patient', 'chw', 'date', 'temperature', 'blood_pressure', 'headache_level', 'nausea_level',
                  'insomniac_level', 'dyspnoea_level', 'cough_level', 'other_problems', 'assumed_disease',
                  'suggestions', 'summary_impression', 'next_visit_date']


# Lesson
class LessonSerializers(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'supervisor', 'title', 'content', 'upload_date']


# Quiz
class QuizSerializers(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'upload_date', 'relatedLesson']


# QuizItem
class QuizItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = QuizItem
        fields = ['id', 'quiz', 'question', 'option_1', 'option_2', 'option_3', 'option_4', 'point', 'correct_option']


# Lesson_CHW
class Lesson_CHWSerializers(serializers.ModelSerializer):
    class Meta:
        model = Lesson_CHW
        fields = ['id', 'lesson', 'chw', 'is_read', 'dateOfRead']


# QuizSubmission
class QuizSubmissionSerializers(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = ['id', 'quiz', 'chw', 'date']


# SubmissionItem
class SubmissionItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = SubmissionItem
        fields = ['id', 'quizSubmission', 'quizItem', 'chosenOption']
