from __future__ import division
import datetime
from email import message
from io import BytesIO

from PIL import Image
from os.path import exists

from django.shortcuts import render
from pyparsing import Or
from rest_framework import viewsets

from ShaakoProject.settings import BASE_DIR
from .serializers import *
from .models import *
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from argon2 import PasswordHasher as ph
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from datetime import datetime


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCampaignList(request):
    if request.method == 'POST':
        organization_id = request.data
        print(organization_id)
        # get all supervisors of the organization
        supervisors = Supervisor.objects.filter(organization=organization_id)
        all_camps = []
        for sup in supervisors:
            # get all campaigns of the supervisor
            campaigns = Supervisor_Campaign.objects.filter(supervisor=sup.id)
            for j in campaigns:
                # add j in all_camps
                all_camps.append(j.campaign.id)
        # remove duplicates from all_camps
        all_camps = list(set(all_camps))
        ret = []
        for i in all_camps:
            # get all details of the campaign
            camp = Campaign.objects.get(id=i)
            # get all supervisor of camp from Supervisor_Campaign
            supervisors = Supervisor_Campaign.objects.filter(campaign=camp.id)
            sups = []
            for j in supervisors:
                # get all details of the supervisor
                sup = Supervisor.objects.get(id=j.supervisor.id)
                dict = {'id': sup.id, 'name': sup.name}
                sups.append(dict)
            # put all details of camp in a dictionary
            if len(camp.campaign_details) > 200:
                camp.campaign_details = camp.campaign_details[:200] + "..."

            camp_dict = {'id': camp.id, 'title': camp.title, 'state_date': camp.state_date.date(),
                         'end_date': camp.end_date.date(),
                         'campaign_details': camp.campaign_details, 'goal': camp.goal, 'supervisors': sups}
            ret.append(camp_dict)
        print(ret)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def editLesson(request):
    if request.method == 'POST':
        data = request.data
        lesson_id = data['id']
        # check data['title'] or data['content'] is null
        if data['title'] == "" or data['content'] == "":
            return Response("False")
        lesson = Lesson.objects.get(id=lesson_id)
        lesson.title = data['title']
        lesson.content = data['content']
        lesson.save()
        return Response("True")


# CHW functions
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getLessonList(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        sup_id = data
        # find all contents of the supervisor with id=sup_id
        lessons = Lesson.objects.filter(supervisor_id=sup_id)
        ret = []
        for lesson in lessons:
            ret.append({'id': lesson.id, 'title': lesson.title,
                        'supervisor_name': lesson.supervisor.name, 'upload_time': lesson.upload_date.date()})
        print(ret)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addPatient(request):
    if request.method == 'POST':
        data = request.data
        name = data['name']
        address = data['address']
        phone = data['phone']
        gen = data['gen']
        birthdate = data['date']
        chw_id = data['chw_id']
        print(name, address, phone, gen, birthdate, chw_id)
        # check if any of the fields is empty or null
        if name == "" or address == "" or phone == "" or gen == "" or birthdate == "":
            return Response("False")
        # convert birtdate to datetime
        birthdate = datetime.strptime(birthdate, '%d-%m-%Y').date()
        # create a new Patient object and add it to Patient table
        patient = Patient(name=name, address=address, contactNo=phone, gender=gen, date_of_birth=birthdate,
                          chw_id=chw_id)
        patient.save()
        return Response("True")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPastQuiz(request):
    if request.method == 'POST':
        data = request.data
        print("hello", data)
        chw_id = data
        # get chw with chw_id
        chw = CHW.objects.get(id=chw_id)
        # find all QuizSubmission where chw id= chw_id
        quiz_submissions = QuizSubmission.objects.filter(chw=chw)
        ret = []
        for quiz_submission in quiz_submissions:
            # get the id of the quiz
            quiz = quiz_submission.quiz
            # get quiz title and upload_date

            quiz_dict = {'id': quiz.id, 'title': quiz.title, 'upload_date': quiz.upload_date.date(),
                         'submission_id': quiz_submission.id}
            ret.append(quiz_dict)
        print(ret)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def supervisorHome(request):
    if request.method == 'POST':
        sup_id = request.data
        # get total number of lessons of this supervisor
        lessons = Lesson.objects.filter(supervisor_id=sup_id)
        total_lessons = len(lessons)

        # get total number of CHWs of this supervisor
        chws = CHW.objects.filter(supervisor_id=sup_id)
        total_chws = len(chws)

        # get total number of patients
        patients = Patient.objects.all()
        total_patients = len(patients)

        # get total number of quizes of this supervisor
        quizes = Quiz.objects.filter(supervisor_id=sup_id)
        total_quizes = len(quizes)

        ret = {'total_lessons': total_lessons, 'total_chws': total_chws, 'total_patients': total_patients,
               'total_quizes': total_quizes}
        print(ret)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCHWImage(request):
    id = request.data
    print(id)
    path = str(BASE_DIR) + "//image//CHW//" + str(id) + ".png"
    if not exists(path):
        path = str(BASE_DIR) + "//image//CHW//default.png"
    im = Image.open(path)
    # send image as response
    buffered = BytesIO()
    im.save(buffered, format="PNG")
    return HttpResponse(buffered.getvalue(), content_type="image/png")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOrganizationAdminImage(request):
    id = request.data
    print(id)
    path = str(BASE_DIR) + "//image//organization//" + str(id) + ".png"
    if not exists(path):
        print("path not found")
        path = str(BASE_DIR) + "//image//organization//default.png"
    im = Image.open(path)
    # send image as response
    buffered = BytesIO()
    im.save(buffered, format="PNG")
    return HttpResponse(buffered.getvalue(), content_type="image/png")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def adminPictureUpdate(request):
    print(request.data)
    if request.method == 'POST':
        try:
            image = request.data['inputimage']
            id = request.data['admin_id']
            print(image)
            print(id)
            img = Image.open(image)
            # find size of img in kB
            # resize image as 100kB

            width, height = img.size
            TARGET_WIDTH = 200
            coefficient = width / TARGET_WIDTH
            new_height = height / coefficient
            img = img.resize((int(TARGET_WIDTH), int(new_height)), Image.ANTIALIAS)
            print("ei")
            img.save(str(BASE_DIR) + "\\image\\organization\\" + str(id) + ".png", qualtity=95,
                     optimize=True)
            return Response("True")
        except:
            print("here")
            return Response("False")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSupervisorProfile(request):
    if request.method == 'POST':
        data = request.data
        sup_id = data
        # get supervisor with sup_id
        supervisor = Supervisor.objects.get(id=sup_id)
        # get organization with organization_id
        organization = Organization.objects.get(id=supervisor.organization_id)

        # get all details of supervisor in a dictionary
        sup_dict = {'id': supervisor.id, 'name': supervisor.name, 'address': supervisor.presentAddress,
                    'contactNo': supervisor.contactNo, 'email': supervisor.email,
                    'recruitment_date': supervisor.recruitment_date.date(), 'organization': organization.name,
                    'division': supervisor.location.division, 'district': supervisor.location.district,
                    'upazilla': supervisor.location.upazilla_thana, 'password': supervisor.password}
        print(sup_dict)
        return Response(sup_dict)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateSupervisorProfile(request):
    if request.method == 'POST':
        data = request.data
        id = data['id']
        name = data['name']
        password = data['password']
        password2 = data['password2']
        passwordOld = data['passwordOld']
        passwordOld2 = data['passwordOld2']
        email = data['email']
        contactNo = data['contact']
        presentAddress = data['address']

        if len(password) == 0 or len(password2) == 0:
            Supervisor.objects.filter(id=id).update(name=name, email=email, contactNo=contactNo,
                                                    presentAddress=presentAddress)
            return Response({"success": "True"})
        if password == password2:
            # match argon2 hash of passwordOld2 with passwordOld with try/except
            try:
                ph().verify(passwordOld, passwordOld2)
                # update OrganizationAdmin with name, password, email, contactNo, presentAddress
                passwordHash = ph().hash(password)
                Supervisor.objects.filter(id=id).update(name=name, password=passwordHash,
                                                        email=email, contactNo=contactNo,
                                                        presentAddress=presentAddress)
                return Response({"success": "True"})

            except:
                return Response({"success": "False"})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getDiseaseStat(request):
    if request.method == 'POST':
        sup_id = request.data['sup_id']
        organization = request.data['organization']
        # get all chw of this supervisor
        chws = CHW.objects.filter(supervisor_id=sup_id)
        if sup_id == 0:
            # get all supervisors of this organization
            supervisors = Supervisor.objects.filter(organization_id=organization)
            chws = CHW.objects.filter(supervisor_id__in=supervisors)
        # get all the patient of all the chw in chws
        patients = Patient.objects.filter(chw_id__in=chws)
        # get all the VisitForm of all the patient in patients
        # if a patient has multiple VisitForm then keep the one with the latest date

        diseases = {}
        for patient in patients:
            # get the latest VisitForm of this patient
            # if no VisitForm then continue
            try:
                latest_visit = VisitForm.objects.filter(patient_id=patient.id).order_by('-date').first()
                # get the disease of this VisitForm
                disease = latest_visit.assumed_disease
                # if disease is not in diseases then add it to diseases
                if disease not in diseases:
                    diseases[disease] = 1
                else:
                    diseases[disease] += 1
            except:
                continue

        # calculate percentage of each disease
        total = 0
        for disease in diseases:
            total += diseases[disease]
        if total != 0:
            for disease in diseases:
                diseases[disease] = (diseases[disease] / total) * 100
                # round to 2 decimal places
                diseases[disease] = round(diseases[disease], 2)
        # if there are more than 10 entries then keep  10 entries with most value
        if len(diseases) > 10:
            diseases = sorted(diseases.items(), key=lambda x: x[1], reverse=True)[:10]
            # dictionary
            diseases = dict(diseases)
            total = 0
            for disease in diseases:
                total += diseases[disease]
            if total != 0:
                diseases['Other'] = 100 - total
        print(diseases)
        return Response(diseases)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSupervisorRecruitmentStat(request):
    if request.method == 'POST':
        organization = request.data['organization']
        # get current year
        current_year = datetime.now().year
        # for all the months of current year get the number of supervisors recruited in that month
        # create a dictionary with key as month and value as number of supervisors recruited in that month
        # if no supervisors recruited in that month then value is 0

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                  'November', 'December']
        sup_recruitment = {}
        for month in months:
            # find how many supervisors are recruited in this month in this year
            total = len(Supervisor.objects.filter(recruitment_date__month=months.index(month) + 1,
                                                  recruitment_date__year=current_year, organization_id=organization))
            sup_recruitment[month] = total
        print(sup_recruitment)
        return Response(sup_recruitment)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCHWRecruitmentStat(request):
    if request.method == 'POST':
        organization = request.data['organization']
        # get current year
        current_year = datetime.now().year

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                  'November', 'December']
        supervisors = Supervisor.objects.filter(organization_id=organization)
        chws = CHW.objects.filter(supervisor_id__in=supervisors)

        chw_recruitment = {}
        for month in months:
            # find how many supervisors are recruited in this month in this year
            total = len(CHW.objects.filter(recruitment_date__month=months.index(month) + 1,
                                           recruitment_date__year=current_year))
            chw_recruitment[month] = total
        print(chw_recruitment)
        return Response(chw_recruitment)
