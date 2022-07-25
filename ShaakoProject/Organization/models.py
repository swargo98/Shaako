from pyexpat import model
from statistics import mode
from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=100)
    officeAddress = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)


class OrganizationAdmin(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=512)
    email = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)
    presentAddress = models.CharField(max_length=100)
    imagePath = models.CharField(max_length=100)


class Location(models.Model):
    division = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    upazilla_thana = models.CharField(max_length=100)
    ward_union = models.CharField(max_length=100, null=True)


class Notification(models.Model):
    timestamp = models.DateTimeField()
    description = models.CharField(max_length=100)
    notification_type = models.CharField(max_length=100)
    type_id = models.CharField(max_length=100)
    is_read = models.BooleanField(default=False)


class Supervisor(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=512)
    email = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)
    presentAddress = models.CharField(max_length=100)
    imagePath = models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True)
    recruitment_date = models.DateTimeField(null=True)


class Campaign(models.Model):
    title = models.CharField(max_length=100)
    state_date = models.DateTimeField()
    end_date = models.DateTimeField()
    campaign_details = models.CharField(max_length=300)
    goal = models.CharField(max_length=100)


class Location_Campaign(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)


class Supervisor_Campaign(models.Model):
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)


class CHW(models.Model):
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=512)
    email = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)
    presentAddress = models.CharField(max_length=100)
    imagePath = models.CharField(max_length=100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    recruitment_date = models.DateTimeField(null=True)

class Patient(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)
    date_of_birth = models.DateTimeField()
    gender = models.CharField(max_length=10)


class PatientCampaign(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField()


class VisitForm(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE)
    date = models.DateTimeField()
    temperature = models.FloatField()
    blood_pressure = models.FloatField()
    headache_level = models.IntegerField()
    nausea_level = models.IntegerField()
    insomniac_level = models.IntegerField()
    dyspnoea_level = models.IntegerField()
    cough_level = models.IntegerField()
    other_problems = models.CharField(max_length=200)
    assumed_disease = models.CharField(max_length=100)
    suggestions = models.CharField(max_length=200)
    summary_impression = models.CharField(max_length=200)
    next_visit_date = models.DateTimeField()


class Lesson(models.Model):
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=2000)
    upload_date = models.DateTimeField()


class Quiz(models.Model):
    title = models.CharField(max_length=100)
    upload_date = models.DateTimeField()
    relatedLesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)


class QuizItem(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    option_1 = models.CharField(max_length=100)
    option_2 = models.CharField(max_length=100)
    option_3 = models.CharField(max_length=100)
    option_4 = models.CharField(max_length=100)
    point = models.IntegerField()
    correct_option = models.IntegerField()


class Lesson_CHW(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    dateOfRead = models.DateTimeField()


class QuizSubmission(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE)
    date = models.DateTimeField()


class SubmissionItem(models.Model):
    quizSubmission = models.ForeignKey(QuizSubmission, on_delete=models.CASCADE)
    quizItem = models.ForeignKey(QuizItem, on_delete=models.CASCADE)
    chosenOption = models.IntegerField()
