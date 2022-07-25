from __future__ import division
import datetime
from django.shortcuts import render
from pyparsing import Or
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from argon2 import PasswordHasher as ph


# Create your views here.
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        data = request.data
        email = data['username']['username']
        password = data['password']['password']
        # password = ph().hash(password)
        # print(email)
        # print(password)
        # print(len(password))

        # find OrganizationAdmin with username and password
        user = OrganizationAdmin.objects.values('password', 'organization', 'id').filter(email=email)

        if user:
            try:
                ph().verify(user[0]['password'], password)
                dict = {}
                dict['correct'] = 'True'
                dict['id'] = user[0]['id']
                dict['organization'] = user[0]['organization']

                return Response(dict)
            except:
                dict = {}
                dict['correct'] = 'False'
                return Response(dict)
        else:
            dict = {}
            dict['correct'] = 'False'
            return Response(dict)


@api_view(['POST'])
def getAssignableSupervisor(request):
    if request.method == 'POST':
        chw_id = request.data
        chw = CHW.objects.get(id=chw_id)
        division = chw.location.division
        district = chw.location.district
        upazilla_thana = chw.location.upazilla_thana
        organization_id = chw.supervisor.organization.id
        ret = []
        for supervisor in Supervisor.objects.all():
            if supervisor.organization.id == organization_id:
                if supervisor.location.division == division and supervisor.location.district == district and supervisor.location.upazilla_thana == upazilla_thana:
                    dict = {'name': supervisor.name, 'division': supervisor.location.division,
                            'district': supervisor.location.district,
                            'upazilla_thana': supervisor.location.upazilla_thana,
                            'recruitment_date': supervisor.recruitment_date.date(),
                            'id': supervisor.id, 'email': supervisor.email, 'contactNo': supervisor.contactNo,
                            'presentAddress': supervisor.presentAddress, 'imagePath': supervisor.imagePath,
                            'organization': supervisor.organization.id}
                    ret.append(dict)
        return Response(ret)


@api_view(['POST'])
def changeSupervisorOfCHW(request):
    if request.method == 'POST':
        data = request.data
        chw_id = data['chwid']
        supervisor_id = data['supid']
        chw = CHW.objects.get(id=chw_id)
        supervisor = Supervisor.objects.get(id=supervisor_id)
        if supervisor is not None and chw is not None:
            chw.supervisor = supervisor
            chw.save()
            return Response('True')
    return Response('False')


@api_view(['GET'])
def home(request):
    if request.method == 'GET':
        # find number entry in patient table
        patient = Patient.objects.count()
        chw = CHW.objects.count()
        supervisor = Supervisor.objects.count()
        data = [patient, chw, supervisor]
        return Response(data)


@api_view(['POST'])
def createSupervisor(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        name = data['name']
        password = data['password']
        email = data['email']
        contactNo = data['contact']
        presentAddress = data['address']
        imagePath = 'image\default.png'
        organization = data['organization']

        division = data['inputdivision']
        district = data['inputdistrict']
        upazilla_thana = data['inputupazilla']
        recruitment_date = datetime.datetime.now()

        location = Location.objects.filter(division=division, district=district, upazilla_thana=upazilla_thana)
        organization = Organization.objects.get(id=organization)
        password = ph().hash(password)

        if organization is not None and location is not None:
            location = location[0]
            supervisor = Supervisor(name=name, password=password, email=email, contactNo=contactNo,
                                    presentAddress=presentAddress, imagePath=imagePath, location=location,
                                    organization=organization, recruitment_date=recruitment_date)
            supervisor.save()
            return Response('True')
        else:
            return Response('False')


@api_view(['GET', 'POST'])
def getSupervisorDetailed(request):
    if request.method == 'GET':
        ret = []
        for supervisor in Supervisor.objects.all():
            location = supervisor.location
            dict = {'name': supervisor.name, 'division': location.division, 'district': location.district,
                    'upazilla_thana': location.upazilla_thana, 'recruitment_date': supervisor.recruitment_date.date(),
                    'id': supervisor.id, 'email': supervisor.email, 'contactNo': supervisor.contactNo,
                    'presentAddress': supervisor.presentAddress, 'imagePath': supervisor.imagePath,
                    'organization': supervisor.organization.id}
            ret.append(dict)
        print(ret)
        return Response(ret)
    if request.method == 'POST':
        ret = []
        for supervisor in Supervisor.objects.all():
            location = supervisor.location
            dict = {'name': supervisor.name, 'division': location.division, 'district': location.district,
                    'upazilla_thana': location.upazilla_thana, 'recruitment_date': supervisor.recruitment_date.date(),
                    'id': supervisor.id, 'email': supervisor.email, 'contactNo': supervisor.contactNo,
                    'presentAddress': supervisor.presentAddress, 'imagePath': supervisor.imagePath,
                    'organization': supervisor.organization.id}
            ret.append(dict)
        print(ret)
        return Response(ret)


@api_view(['POST'])
def getUnionsOfSupervisor(request):
    if request.method == 'POST':
        data = request.data
        supervisor_id = data
        supervisor = Supervisor.objects.get(id=supervisor_id)
        if supervisor is not None:
            location = supervisor.location
            division = location.division
            district = location.district
            upazilla_thana = location.upazilla_thana

            location = Location.objects.filter(division=division, district=district, upazilla_thana=upazilla_thana)
            ret = []
            for loc in location:
                ret.append(loc.ward_union)
            return Response(ret)
    return Response('WRONG')


@api_view(['POST'])
def updateSupervisor(request):
    data = request.data
    supervisor = Supervisor.objects.get(id=data['sup_id'])
    division = data['inputdivision']
    district = data['inputdistrict']
    upazilla_thana = data['inputupazilla']

    if supervisor is not None:
        location = Location.objects.filter(division=division, district=district, upazilla_thana=upazilla_thana)
        if location is not None:
            supervisor.location = location[0]
            supervisor.save()
            return Response('True')
    return Response('False')


@api_view(['POST'])
def fetchLocationSupervisor(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        division = data['inputdivision']
        district = data['inputdistrict']
        upazilla_thana = data['inputupazilla']
        # ward_union = data['ward_union']['ward_union']

        dict = {}
        divisions = Location.objects.values('division').distinct()
        ret = []
        for d in divisions:
            ret.append(d['division'])
        dict['division'] = ret

        if len(division) == 0:
            division = ret[0]

        districts = Location.objects.values('district').filter(division=division).distinct()
        ret = []
        for d in districts:
            ret.append(d['district'])
        dict['district'] = ret

        if len(district) == 0:
            district = ret[0]

        upazilla_thanas = Location.objects.values('upazilla_thana').filter(district=district).distinct()
        ret = []
        for d in upazilla_thanas:
            ret.append(d['upazilla_thana'])
        dict['upazilla'] = ret

        return Response(dict)


@api_view(['GET'])
def getSupervisor(request):
    if request.method == 'GET':
        ret = []
        for supervisor in Supervisor.objects.all():
            location = supervisor.location
            dict = {'name': supervisor.name, 'division': location.division, 'district': location.district,
                    'upazilla_thana': location.upazilla_thana, 'recruitment_date': supervisor.recruitment_date.date(),
                    'id': supervisor.id}
            ret.append(dict)
        return Response(ret)


@api_view(['POST'])
def getCHW(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        ret = []
        for chw in CHW.objects.filter(supervisor__organization=data):
            location = chw.location
            supervisor = chw.supervisor
            dict = {'name': chw.name, 'division': location.division, 'district': location.district,
                    'upazilla_thana': location.upazilla_thana, 'ward_union': location.ward_union,
                    'recruitment_date': chw.recruitment_date.date(),
                    'id': chw.id, 'email': chw.email, 'contactNo': chw.contactNo, 'presentAddress': chw.presentAddress,
                    'imagePath': chw.imagePath,
                    'supervisor_name': supervisor.name, 'supervisor_id': supervisor.id}
            ret.append(dict)
        return Response(ret)


@api_view(['POST'])
def createCHW(request):
    if request.method == 'POST':
        data = request.data
        supervisor_id = data['supid']
        supervisor = Supervisor.objects.get(id=supervisor_id)
        name = data['name']
        password = data['password']
        password = ph().hash(password)
        email = data['email']
        contactNo = data['contact']
        presentAddress = data['address']
        imagePath = 'image\default.png'
        division = data['division']
        district = data['district']
        upazilla_thana = data['upazilla_thana']
        ward_union = data['inputward']
        location = Location.objects.filter(division=division, district=district, upazilla_thana=upazilla_thana,
                                           ward_union=ward_union)
        recruitment_date = datetime.datetime.now()

        if location is not None and supervisor is not None:
            location = location[0]
            chw = CHW(name=name, password=password, email=email, contactNo=contactNo,
                      presentAddress=presentAddress, imagePath=imagePath, location=location,
                      supervisor=supervisor, recruitment_date=recruitment_date)
            chw.save()
            return Response('True')

    return Response('False')


@api_view(['POST'])
def deleteSupervisor(request):
    if request.method == 'POST':
        data = request.data
        id = data
        supervisor = Supervisor.objects.get(id=id)
        supervisor.delete()
        return Response('True')
    return Response('False')


@api_view(['POST'])
def deleteCHW(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        id = data
        chw = CHW.objects.get(id=id)
        chw.delete()
        return Response('True')
    return Response('False')


@api_view(['POST'])
def searchCHW(request):
    if request.method == 'POST':
        data = request.data
        searchtext = data['search']
        organization_id = data['organization']
        organization = Organization.objects.get(id=organization_id)
        chws = CHW.objects.filter(supervisor__organization=organization).distinct()
        ret = []
        for chw in chws:
            # print(chw.name)
            location = chw.location
            if searchtext in chw.name or (location is not None and (
                    searchtext in location.division or searchtext in location.district or searchtext in location.upazilla_thana or searchtext in location.ward_union
            )) or searchtext in chw.email or searchtext in chw.presentAddress or searchtext in chw.contactNo or searchtext in chw.supervisor.name:
                dict = {'name': chw.name, 'division': location.division, 'district': location.district,
                        'upazilla_thana': location.upazilla_thana, 'ward_union': location.ward_union,
                        'recruitment_date': chw.recruitment_date.date(),
                        'id': chw.id, 'email': chw.email, 'contactNo': chw.contactNo,
                        'presentAddress': chw.presentAddress, 'imagePath': chw.imagePath,
                        'supervisor_name': chw.supervisor.name, 'supervisor_id': chw.supervisor.id}
                ret.append(dict)
        # print(ret)
        return Response(ret)


@api_view(['POST'])
def searchSupervisor(request):
    if request.method == 'POST':
        data = request.data
        searchtext = data
        ret = []
        for supervisor in Supervisor.objects.all():
            location = supervisor.location
            if searchtext in supervisor.name or (location is not None and (
                    searchtext in location.division or searchtext in location.district or searchtext in location.upazilla_thana
            ) or searchtext in supervisor.email or searchtext in supervisor.presentAddress):
                dict = {'name': supervisor.name, 'division': location.division, 'district': location.district,
                        'upazilla_thana': location.upazilla_thana,
                        'recruitment_date': supervisor.recruitment_date.date(),
                        'id': supervisor.id, 'email': supervisor.email, 'contactNo': supervisor.contactNo,
                        'presentAddress': supervisor.presentAddress, 'imagePath': supervisor.imagePath,
                        'organization': supervisor.organization.id}
                ret.append(dict)
        # print(ret)
        return Response(ret)


# Organization
class OrganizationList(ListAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializers


class OrganizationCreate(CreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializers


class OrganizationDestroy(DestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializers


# Organization Admin
class OrganizationAdminList(ListAPIView):
    queryset = OrganizationAdmin.objects.all()
    serializer_class = OrganizationAdminSerializers


class OrganizationAdminCreate(CreateAPIView):
    queryset = OrganizationAdmin.objects.all()
    serializer_class = OrganizationAdminSerializers


class OrganizationAdminDestroy(DestroyAPIView):
    queryset = OrganizationAdmin.objects.all()
    serializer_class = OrganizationAdminSerializers


# Location
class LocationList(ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers


class LocationCreate(CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers


class LocationDestroy(DestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers


# Notification
class NotificationList(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializers


class NotificationCreate(CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializers


class NotificationDestroy(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializers


# Supervisor
class SupervisorList(ListAPIView):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorSerializers


class SupervisorCreate(CreateAPIView):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorSerializers


class SupervisorDestroy(DestroyAPIView):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorSerializers


# Campaign
class CampaignList(ListAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializers


class CampaignCreate(CreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializers


class CampaignDestroy(DestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializers


# Location_Campaign
class Location_CampaignList(ListAPIView):
    queryset = Location_Campaign.objects.all()
    serializer_class = Location_CampaignSerializers


class Location_CampaignCreate(CreateAPIView):
    queryset = Location_Campaign.objects.all()
    serializer_class = Location_CampaignSerializers


class Location_CampaignDestroy(DestroyAPIView):
    queryset = Location_Campaign.objects.all()
    serializer_class = Location_CampaignSerializers


# Supervisor_Campaign
class Supervisor_CampaignList(ListAPIView):
    queryset = Supervisor_Campaign.objects.all()
    serializer_class = Supervisor_CampaignSerializers


class Supervisor_CampaignCreate(CreateAPIView):
    queryset = Supervisor_Campaign.objects.all()
    serializer_class = Supervisor_CampaignSerializers


class Supervisor_CampaignDestroy(DestroyAPIView):
    queryset = Supervisor_Campaign.objects.all()
    serializer_class = Supervisor_CampaignSerializers


# CHW
class CHWList(ListAPIView):
    queryset = CHW.objects.all()
    serializer_class = CHWSerializers


class CHWCreate(CreateAPIView):
    queryset = CHW.objects.all()
    serializer_class = CHWSerializers


class CHWDestroy(DestroyAPIView):
    queryset = CHW.objects.all()
    serializer_class = CHWSerializers


# Patient
class PatientList(ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializers


class PatientCreate(CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializers


class PatientDestroy(DestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializers


# PatientCampaign
class PatientCampaignList(ListAPIView):
    queryset = PatientCampaign.objects.all()
    serializer_class = PatientCampaignSerializers


class PatientCampaignCreate(CreateAPIView):
    queryset = PatientCampaign.objects.all()
    serializer_class = PatientCampaignSerializers


class PatientCampaignDestroy(DestroyAPIView):
    queryset = PatientCampaign.objects.all()
    serializer_class = PatientCampaignSerializers


# VisitForm
class VisitFormList(ListAPIView):
    queryset = VisitForm.objects.all()
    serializer_class = VisitFormSerializers


class VisitFormCreate(CreateAPIView):
    queryset = VisitForm.objects.all()
    serializer_class = VisitFormSerializers


class VisitFormDestroy(DestroyAPIView):
    queryset = VisitForm.objects.all()
    serializer_class = VisitFormSerializers


# Lesson
class LessonList(ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializers


class LessonCreate(CreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializers


class LessonDestroy(DestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializers


# Quiz
class QuizList(ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializers


class QuizCreate(CreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializers


class QuizDestroy(DestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializers


# QuizItem
class QuizItemList(ListAPIView):
    queryset = QuizItem.objects.all()
    serializer_class = QuizItemSerializers


class QuizItemCreate(CreateAPIView):
    queryset = QuizItem.objects.all()
    serializer_class = QuizItemSerializers


class QuizItemDestroy(DestroyAPIView):
    queryset = QuizItem.objects.all()
    serializer_class = QuizItemSerializers


# Lesson_CHW
class Lesson_CHWList(ListAPIView):
    queryset = Lesson_CHW.objects.all()
    serializer_class = Lesson_CHWSerializers


class Lesson_CHWCreate(CreateAPIView):
    queryset = Lesson_CHW.objects.all()
    serializer_class = Lesson_CHWSerializers


class Lesson_CHWDestroy(DestroyAPIView):
    queryset = Lesson_CHW.objects.all()
    serializer_class = Lesson_CHWSerializers


# QuizSubmission
class QuizSubmissionList(ListAPIView):
    queryset = QuizSubmission.objects.all()
    serializer_class = QuizSubmissionSerializers


class QuizSubmissionCreate(CreateAPIView):
    queryset = QuizSubmission.objects.all()
    serializer_class = QuizSubmissionSerializers


class QuizSubmissionDestroy(DestroyAPIView):
    queryset = QuizSubmission.objects.all()
    serializer_class = QuizSubmissionSerializers


# SubmissionItem
class SubmissionItemList(ListAPIView):
    queryset = SubmissionItem.objects.all()
    serializer_class = SubmissionItemSerializers


class SubmissionItemCreate(CreateAPIView):
    queryset = SubmissionItem.objects.all()
    serializer_class = SubmissionItemSerializers


class SubmissionItemDestroy(DestroyAPIView):
    queryset = SubmissionItem.objects.all()
    serializer_class = SubmissionItemSerializers
