from __future__ import division
from dataclasses import dataclass
import datetime
from email import message
from http.client import HTTPResponse
from importlib.resources import path
from io import BytesIO
import math
from PIL import Image
from os.path import exists
from django.utils import timezone
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
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# def makeToken():
#     # iterate over all supervisors
#     for supervisor in Supervisor.objects.all():


# Create your views here.
@api_view(['POST'])
def supervisorlogin(request):
    if request.method == 'POST':
        data = request.data
        email = data['username']
        password = data['password']
        print(request.data)
        # find OrganizationAdmin with username and password
        user = Supervisor.objects.values('password', 'organization', 'id').filter(email=email)

        if user:
            try:
                ph().verify(user[0]['password'], password)

                token = Token.objects.get(user=User.objects.get(username=email))

                dict = {}
                dict['correct'] = 'True'
                dict['id'] = user[0]['id']
                dict['organization'] = user[0]['organization']
                dict['token'] = token.key

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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def supGetCHWList(request):
    print("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    if request.method == 'POST':
        data = request.data
        sup_id = data['sup_id']
        # find all CHW objects with supervisor_id

        chw_list = CHW.objects.filter(supervisor_id=sup_id)
        print(chw_list)
        ret = []
        for chw in chw_list:
            dict = {}
            dict['id'] = chw.id
            dict['name'] = chw.name
            dict['contactNo'] = chw.contactNo
            dict['union'] = chw.location.ward_union
            dict['recruitment_date'] = chw.recruitment_date.date()
            # find all visit forms of chw
            visit_forms = VisitForm.objects.filter(chw_id=chw.id).count()
            dict['visit_forms'] = visit_forms
            ret.append(dict)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def searchCHW(request):
    if request.method == 'POST':
        data = request.data
        searchtext = data['search']
        sup_id = data['sup_id']

        chw_list = CHW.objects.filter(supervisor_id=sup_id)
        print(chw_list)
        ret = []
        for chw in chw_list:
            location = chw.location
            if searchtext in chw.name or (location is not None and (
                    searchtext in location.division or searchtext in location.district or searchtext in location.upazilla_thana or searchtext in location.ward_union)) or searchtext in chw.email or searchtext in chw.presentAddress or searchtext in chw.contactNo or searchtext in chw.supervisor.name:
                dict = {}
                dict['name'] = chw.name
                dict['contactNo'] = chw.contactNo
                dict['union'] = chw.location.ward_union
                dict['recruitment_date'] = chw.recruitment_date.date()
                # find all visit forms of chw
                visit_forms = VisitForm.objects.filter(chw_id=chw.id).count()
                dict['visit_forms'] = visit_forms
                ret.append(dict)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addNewQuiz(request):
    if request.method == 'POST':
        data = request.data
        sup_id = data['sup_id']
        quizName = data['quizName']
        items = data['result']
        print(sup_id)
        print(quizName)
        print(items)

        # create new Quiz with title=quizName
        newQuiz = Quiz(title=quizName, upload_date=datetime.datetime.now(),
                       supervisor=Supervisor.objects.get(id=sup_id))
        newQuiz.save()
        # create new QuizItem for each item in items
        for item in items:
            newQuizItem = QuizItem(quiz=newQuiz, question=item['ques'], option_1=item['option1'],
                                   option_2=item['option2'], option_3=item['option3'], option_4=item['option4'],
                                   correct_option=int(item['correct']), point=1)
            newQuizItem.save()

        # find all CHW objects with supervisor_id
        chw_list = CHW.objects.filter(supervisor_id=sup_id)
        for chw in chw_list:
            # make new notification for each CHW
            newNotification = Notification(chw_id=chw, description="নতুন কুইজ '" + quizName + "' আপলোড করা হয়েছে",
                                           timestamp=datetime.datetime.now(), notification_type="quiz",
                                           type_id=newQuiz.id, is_read=False)
            newNotification.save()

        return Response('successful')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getQ(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        sup_id = request.data['sup_id']
        chw_id = request.data['chw_id']

        # find chw
        chw = CHW.objects.get(id=chw_id)

        # find all contents of the supervisor with id=sup_id
        quizes = Quiz.objects.filter(supervisor_id=sup_id)
        # order quizes by upload_date
        quizes = quizes.order_by('-upload_date')
        ret = []
        for quiz in quizes:
            # find QuizSubmission where chw=chw and quiz=quiz
            quizSubmission = QuizSubmission.objects.filter(chw=chw, quiz=quiz)
            played=True
            if quizSubmission.count() == 0:
                played=False
            ret.append({'id': quiz.id, 'title': quiz.title, 'supervisor_name': quiz.supervisor.name,
                        'upload_time': quiz.upload_date.date(),'played':played})
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getMyQuiz(request):
    if request.method == 'POST':
        data = request.data
        quiz_id = data['id']
        sup_id = int(data['sup_id'])
        print(data)
        quiz = Quiz.objects.get(id=quiz_id)
        print(quiz.supervisor_id)
        print(sup_id)
        if sup_id != quiz.supervisor_id:
            print('fall', sup_id, quiz.supervisor_id, type(sup_id), type(quiz.supervisor_id))
            return Response('No quiz found')
        print('helloooooo')

        dict = {}
        dict['title'] = quiz.title
        dict['upload_time'] = quiz.upload_date.date()
        dict['author'] = quiz.supervisor.name

        quizItems = QuizItem.objects.filter(quiz_id=quiz_id)
        items = []

        for quizItem in quizItems:
            items.append({'ques': quizItem.question, 'option1': quizItem.option_1, 'option2': quizItem.option_2,
                          'option3': quizItem.option_3, 'option4': quizItem.option_4,
                          'correct': quizItem.correct_option, 'point': quizItem.point, 'id': quizItem.id})

        dict['items'] = items
        print(dict)
        return Response(dict)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def kichuekta(request):
    if request.method == 'GET':
        return Response("Eseche")


@api_view(['POST'])
def chwlogin(request):
    if request.method == 'POST':
        data = request.data
        email = data['username']
        password = data['password']

        user = CHW.objects.values('password', 'supervisor', 'id').filter(email=email)

        if user:
            try:
                sup_id = user[0]['supervisor']
                org_id = Supervisor.objects.get(id=sup_id).organization_id

                ph().verify(user[0]['password'], password)

                token = Token.objects.get(user=User.objects.get(username=email))

                dict = {}
                dict['correct'] = 'True'
                dict['chw_id'] = user[0]['id']
                dict['org_id'] = org_id
                dict['token'] = token.key
                dict['sup_id'] = sup_id

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
def getNosContent(request):
    if request.method == 'POST':
        data = request.data
        sup_id = data['sup_id']
        print(sup_id)

        # get number of lessons of the supervisor with id=sup_id
        lessons = Lesson.objects.filter(supervisor_id=sup_id)
        # get number of quiz of the supervisor with id=sup_id
        quizes = Quiz.objects.filter(supervisor_id=sup_id)

        print(lessons)
        print(quizes)

        dict = {}
        dict['lesson_count'] = lessons.count()
        dict['quiz_count'] = quizes.count()

        return Response(dict)


@api_view(['POST'])
def submitQuiz(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        quiz_id = data['id']
        # make new quiz submission with quiz_id=quiz_id and chw_id=chw_id

        # find quiz with quiz_id
        quiz = Quiz.objects.get(id=quiz_id)

        newQuizSubmission = QuizSubmission(quiz=quiz, chw_id=data['chw_id'], date=datetime.datetime.now())
        newQuizSubmission.save()
        items = data['now']
        for item in items:
            quizItem = QuizItem.objects.get(id=item['id'])
            submissionItem = SubmissionItem(quizSubmission=newQuizSubmission, quizItem=quizItem,
                                            chosenOption=item['response'])
            submissionItem.save()
        return Response(newQuizSubmission.id)


@api_view(['POST'])
def getQuizSubmission(request):
    if request.method == 'POST':
        data = request.data
        print(data)

        submission_id = data['submission_id']

        # find quiz submission with id=submission_id
        submission = QuizSubmission.objects.get(id=submission_id)
        # find quiz of the quiz submission
        quiz = submission.quiz
        # find all submission items of the quiz submission
        submissionItems = SubmissionItem.objects.filter(quizSubmission=submission)

        response = {}

        response['quiz_name'] = quiz.title

        ret = []
        cnt = 0
        tot = 0
        for items in submissionItems:
            dict = {}
            dict['question'] = items.quizItem.question
            dict['option1'] = items.quizItem.option_1
            dict['option2'] = items.quizItem.option_2
            dict['option3'] = items.quizItem.option_3
            dict['option4'] = items.quizItem.option_4
            dict['correct'] = items.quizItem.correct_option
            dict['chosen'] = items.chosenOption
            ret.append(dict)
            if dict['chosen'] == dict['correct']:
                cnt += 1
            tot += 1
        response['ret'] = ret
        response['cnt'] = cnt
        response['tot'] = tot
        print("came here")
        print(ret)

        return Response(response)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getNotification(request):
    if request.method == 'POST':
        chw_id = request.data['chw_id']
        print("-------------------------------------------------")
        print(chw_id)

        # find all notifications of the chw with id=chw_id sorted by decreasing timestamp
        notifications = Notification.objects.filter(chw_id=chw_id).order_by('-timestamp')
        print(notifications)

        ret = []

        for notification in notifications:
            dict = {}
            dict['id'] = notification.id
            dict['description'] = notification.description
            dict['date'] = notification.timestamp.date()
            print(notification.timestamp)
            # find difference in minute between current time and timestamp
            # datetime.replace(tzinfo=None)
            diff = ((datetime.datetime.now(timezone.utc) - notification.timestamp).total_seconds()+21600) / 60
            diff=math.floor(diff)

            if diff<=60:
                diff="{} মিনিট আগে".format(diff)
            else:
                diff=diff/60
                diff=math.floor(diff)
                if diff<=24:
                    diff="{} ঘন্টা আগে".format(diff)
                else:
                    diff=diff/24
                    diff=math.floor(diff)
                    diff="{} দিন আগে".format(diff)

            dict['ago_minute'] = diff
            dict['is_read'] = notification.is_read
            dict['notification_type']=notification.notification_type
            dict['type_id'] = notification.type_id
            dict['is_read'] = notification.is_read

            ret.append(dict)
            
        print(ret)
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatientList(request):
    if request.method == 'POST':
        chw_id = request.data
        # find chw with id=chw_id
        chw = CHW.objects.get(id=chw_id)
        # find all patients
        patients = Patient.objects.all()
        print(patients)

        ret = []
        for patient in patients:
            if patient.chw.location != chw.location:
                continue
            dict = {}
            dict['id'] = patient.id
            dict['name'] = patient.name
            dict['contact_no'] = patient.contactNo
            ret.append(dict)

        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatientImage(request):
    if request.method == 'POST':
        patient_id = request.data
        path = str(BASE_DIR) + "//image//patient//" + str(patient_id) + ".png"
        if not exists(path):
            path = str(BASE_DIR) + "//image//patient//default.png"
        im = Image.open(path)
        # send image as response
        buffered = BytesIO()
        im.save(buffered, format="PNG")
        return HttpResponse(buffered.getvalue(), content_type="image/png")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAllCampaigns(request):
    if request.method == 'POST':
        chw_id = request.data
        
        # find chw with id=chw_id
        chw = CHW.objects.get(id=chw_id)
        # find supervisor of chw
        supervisor = chw.supervisor
        # find all Supervisor_Campaign where supervisor is supervisor
        sup_campaigns = Supervisor_Campaign.objects.filter(supervisor=supervisor)

        campaigns=[]
        for sup_camp in sup_campaigns:
            campaigns.append(sup_camp.campaign)

        #sort campaigns by decreasing state_date
        campaigns = sorted(campaigns, key=lambda x: x.state_date, reverse=True)

        # filter all campaigns if end_date<current_date
        now = timezone.now()
        campaigns = [campaign for campaign in campaigns if campaign.end_date >= now]
        
        print(campaigns)

        ret=[]
        for campaign in campaigns:
            dict={}
            dict['title']=campaign.title
            dict['start_date']=campaign.state_date
            dict['end_date']=campaign.end_date.date()
            dict['id']=campaign.id
            dict['campaign_details']=campaign.campaign_details
            dict['goal']=campaign.goal
            # find number of entries in PatientCampaign where campaign=campaign
            entries = PatientCampaign.objects.filter(campaign=campaign)
            dict['count']=len(entries)
            ret.append(dict)
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUnenrolledPatient(request):
    if request.method == 'POST':
        campaign_id = request.data['campaign_id']
        chw_id = request.data['chw_id']
        
        # find campaign with campaign_id
        campaign = Campaign.objects.get(id=campaign_id)

        # find chw with chw_id
        chw = CHW.objects.get(id=chw_id)
        location = chw.location

        # find all patients if location of his chw is location
        patients = Patient.objects.filter(chw__location=location)

        fin={}

        ret=[]
        for patient in patients:
            patient_id=patient.id
            # find all entries in PatientCampaign where patient=patient and campaign=campaign
            entries = PatientCampaign.objects.filter(patient=patient, campaign=campaign)
            if len(entries)==0:
                dict={}
                dict['id']=patient.id
                dict['name']=patient.name
                dict['contact_no']=patient.contactNo
                ret.append(dict)
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def enrollCHW(request):
    if request.method == 'POST':
        chw_id=request.data['chw_id']
        campaign_id=request.data['campaign_id']
        patient_id=request.data['patient_id']

        # find chw with chw_id
        chw = CHW.objects.get(id=chw_id)
        # find campaign with campaign_id
        campaign = Campaign.objects.get(id=campaign_id)
        # find patient with patient_id
        patient = Patient.objects.get(id=patient_id)
        # create new PatientCampaign with enrollment_date=now
        PatientCampaign.objects.create(patient=patient, campaign=campaign, chw=chw, enrollment_date=datetime.datetime.now())

        return Response("done")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def makeReadNotification(request):
    if request.method == 'POST':
        id=request.data
        print("notification: "+str(id))
        notification = Notification.objects.get(id=id)
        notification.is_read=True
        notification.save()
        return Response("marked as read")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSchedule(request):
    if request.method == 'POST':
        chw_id=request.data['chw_id']
        date=request.data['date']
        print("schedule: "+str(chw_id)+" "+str(date))
        x=datetime.datetime.strptime(date,'%d-%b-%Y')
        print(x)
        x=x.replace(tzinfo=timezone.utc)

        # find chw with chw_id
        chw = CHW.objects.get(id=chw_id)

        # find all visit form where chw=chw and next_visit_date=date
        visits = VisitForm.objects.filter(chw=chw, next_visit_date=x)

        ret=[]

        for visit in visits:
            patient=visit.patient
            dict={}
            dict['id']=patient.id
            dict['name']=patient.name
            dict['address']=patient.address
            dict['last_visit']=visit.date.date()
            ret.append(dict)
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def mark_lesson_read(request):
    if request.method == 'POST':
        print("came here")
        chw_id=request.data['chw_id']
        lesson_id=request.data['lesson_id']
        
        # find chw with chw_id
        chw = CHW.objects.get(id=chw_id)
        # find lesson with lesson_id
        lesson = Lesson.objects.get(id=lesson_id)
        #create Lesson_CHW where chw=chw and lesson=lesson and date=now and is_read=True
        entry=Lesson_CHW(chw=chw, lesson=lesson, dateOfRead=datetime.datetime.now(), is_read=True)
        entry.save()
        return Response("done")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSupNotification(request):
    if request.method == 'POST':
        sup_id=request.data
        # find supervisor with sup_id
        supervisor = Supervisor.objects.get(id=sup_id)
        # find all Supervisors_Notification where supervisor=supervisor
        notifications = Supervisors_Notification.objects.filter(supervisor=supervisor)

        ret = []

        for notification in notifications:
            dict = {}
            dict['id'] = notification.id
            dict['description'] = notification.description
            dict['date'] = notification.timestamp.date()
            print(notification.timestamp)
            # find difference in minute between current time and timestamp
            # datetime.replace(tzinfo=None)
            diff = ((datetime.datetime.now(timezone.utc) - notification.timestamp).total_seconds()+21600) / 60
            diff=math.floor(diff)

            if diff<=60:
                diff="{} মিনিট আগে".format(diff)
            else:
                diff=diff/60
                diff=math.floor(diff)
                if diff<=24:
                    diff="{} ঘন্টা আগে".format(diff)
                else:
                    diff=diff/24
                    diff=math.floor(diff)
                    diff="{} দিন আগে".format(diff)

            dict['ago_minute'] = diff
            dict['is_read'] = notification.is_read
            dict['notification_type']=notification.notification_type
            dict['type_id'] = notification.type_id

            ret.append(dict)
            
        print(ret)

        return Response(ret)
