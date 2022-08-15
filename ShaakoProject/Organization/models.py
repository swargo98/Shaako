from pyexpat import model
from statistics import mode
from django.db import models


# Create your models here.

class Organization(models.Model):
    name = models.CharField(max_length=100)
    officeAddress = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)


# create OrganizationAdmin class with Organization, name, password, email, contact no, present address and image path
class OrganizationAdmin(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=512)
    email = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)
    presentAddress = models.CharField(max_length=100)
    imagePath = models.CharField(max_length=100)


# create Location class with division, district, upazilla_thana, ward_union
class Location(models.Model):
    division = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    upazilla_thana = models.CharField(max_length=100)
    ward_union = models.CharField(max_length=100, null=True)


# create Supervisor with Organization, name, password, email, contact no, present_address, image_path
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


# create Campaign with Title, state_date, end_date, campaign_details and goal
class Campaign(models.Model):
    title = models.CharField(max_length=100)
    state_date = models.DateTimeField()
    end_date = models.DateTimeField()
    campaign_details = models.CharField(max_length=300)
    goal = models.CharField(max_length=100)


# create Location_Campaign with Location and Campaign
class Location_Campaign(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)


# create Supervisor Campaign with Supervisor and Campaign
class Supervisor_Campaign(models.Model):
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)


# create CHW with Supervisor, name, password, email, contact no, present_address, image_path
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


# create Patient with name, address, contact no, date_of_birth, gender
class Patient(models.Model):
    name = models.CharField(max_length=100)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE, null=True, default=None)
    address = models.CharField(max_length=100)
    contactNo = models.CharField(max_length=100)
    date_of_birth = models.DateTimeField()
    gender = models.CharField(max_length=10)


# create PatientCampaign with patient, campaign, chw and enrollment_date
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


# create Lesson with supervisor, title, content, upload_date
class Lesson(models.Model):
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    # create a variable length content 
    content = models.CharField(max_length=100000)
    upload_date = models.DateTimeField()


# create Quiz with title, upload date, lesson
class Quiz(models.Model):
    title = models.CharField(max_length=100)
    upload_date = models.DateTimeField()
    supervisor = models.ForeignKey(Supervisor, on_delete=models.CASCADE, null=True)


# create QuizItem with Quiz, Question, option_1, option_2, option_3, option_4, point, correct_option
class QuizItem(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=100)
    option_1 = models.CharField(max_length=100)
    option_2 = models.CharField(max_length=100)
    option_3 = models.CharField(max_length=100)
    option_4 = models.CharField(max_length=100)
    point = models.IntegerField()
    correct_option = models.IntegerField()


# create Lesson_CHW  with Lesson, CHW, is_read, dateOfRead
class Lesson_CHW(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    dateOfRead = models.DateTimeField()


# create QuizSubmission with Quiz, CHW, date
class QuizSubmission(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    chw = models.ForeignKey(CHW, on_delete=models.CASCADE)
    date = models.DateTimeField()


# create SubmissionItem with QuizSubmission, QuizItem, chosenOption
class SubmissionItem(models.Model):
    quizSubmission = models.ForeignKey(QuizSubmission, on_delete=models.CASCADE)
    quizItem = models.ForeignKey(QuizItem, on_delete=models.CASCADE)
    chosenOption = models.IntegerField()


# create notification class with timestamp, description, notification_type, type_id, is_read
class Notification(models.Model):
    chw_id = models.ForeignKey(CHW, on_delete=models.CASCADE, default=None)
    timestamp = models.DateTimeField()
    description = models.CharField(max_length=100)
    notification_type = models.CharField(max_length=100)
    type_id = models.IntegerField()
    is_read = models.BooleanField(default=False)
