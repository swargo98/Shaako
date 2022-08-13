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

                token=Token.objects.get(user=User.objects.get(username=email))

                dict = {}
                dict['correct'] = 'True'
                dict['id'] = user[0]['id']
                dict['organization'] = user[0]['organization']
                dict['token']=token.key
                
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
        ret=[]
        for chw in chw_list:
            dict={}
            dict['name']=chw.name
            dict['contactNo']=chw.contactNo
            dict['union']=chw.location.ward_union
            dict['recruitment_date']=chw.recruitment_date.date()
            # find all visit forms of chw
            visit_forms = VisitForm.objects.filter(chw_id=chw.id).count()
            dict['visit_forms']=visit_forms
            ret.append(dict)
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def searchCHW(request):
    if request.method == 'POST':
        data = request.data
        searchtext = data['search']
        sup_id=data['sup_id']
        
        chw_list = CHW.objects.filter(supervisor_id=sup_id)
        print(chw_list)
        ret=[]
        for chw in chw_list:
            location=chw.location
            if searchtext in chw.name or (location is not None and (searchtext in location.division or searchtext in location.district or searchtext in location.upazilla_thana or searchtext in location.ward_union)) or searchtext in chw.email or searchtext in chw.presentAddress or searchtext in chw.contactNo or searchtext in chw.supervisor.name:
                dict={}
                dict['name']=chw.name
                dict['contactNo']=chw.contactNo
                dict['union']=chw.location.ward_union
                dict['recruitment_date']=chw.recruitment_date.date()
                # find all visit forms of chw
                visit_forms = VisitForm.objects.filter(chw_id=chw.id).count()
                dict['visit_forms']=visit_forms
                ret.append(dict)
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addNewQuiz(request):
    if request.method == 'POST':
        data = request.data
        sup_id=data['sup_id']
        quizName=data['quizName']
        items=data['result']
        print(sup_id)
        print(quizName)
        print(items)

        # create new Quiz with title=quizName
        newQuiz = Quiz(title=quizName, upload_date=datetime.datetime.now(), supervisor=Supervisor.objects.get(id=sup_id))
        newQuiz.save()
        # create new QuizItem for each item in items
        for item in items:
            newQuizItem = QuizItem(quiz=newQuiz, question=item['ques'], option_1=item['option1'], option_2=item['option2'], option_3=item['option3'], option_4=item['option4'], correct_option=int(item['correct']), point=1)
            newQuizItem.save()
        return Response('successful')

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getQ(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        sup_id = data
        # find all contents of the supervisor with id=sup_id
        quizes = Quiz.objects.filter(supervisor_id=sup_id)
        ret = []
        for quiz in quizes:
            ret.append({'id': quiz.id, 'title': quiz.title, 'supervisor_name': quiz.supervisor.name, 'upload_time': quiz.upload_date.date()})
        return Response(ret)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getMyQuiz(request):
    if request.method == 'POST':
        data = request.data
        quiz_id=data['id']
        sup_id=int(data['sup_id'])
        print(data)
        quiz=Quiz.objects.get(id=quiz_id)
        print(quiz.supervisor_id)
        print(sup_id)
        if sup_id != quiz.supervisor_id:
            print('fall',sup_id,quiz.supervisor_id, type(sup_id), type(quiz.supervisor_id))
            return Response('No quiz found')
        print('helloooooo')
        
        dict={}
        dict['title']=quiz.title
        dict['upload_time']=quiz.upload_date.date()
        dict['author']=quiz.supervisor.name

        quizItems=QuizItem.objects.filter(quiz_id=quiz_id)
        items=[]

        for quizItem in quizItems:
            items.append({'ques':quizItem.question,'option1':quizItem.option_1,'option2':quizItem.option_2,'option3':quizItem.option_3,'option4':quizItem.option_4,'correct':quizItem.correct_option,'point':quizItem.point})

        dict['items']=items
        print(dict)
        return Response(dict)

@api_view(['GET'])
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
                sup_id=user[0]['supervisor']
                org_id=Supervisor.objects.get(id=sup_id).organization_id

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
        sup_id=data['sup_id']
        print(sup_id)

        # get number of lessons of the supervisor with id=sup_id
        lessons = Lesson.objects.filter(supervisor_id=sup_id)
        # get number of quiz of the supervisor with id=sup_id
        quizes = Quiz.objects.filter(supervisor_id=sup_id)

        print(lessons)
        print(quizes)

        dict={}
        dict['lesson_count']=lessons.count()
        dict['quiz_count']=quizes.count()

        return Response(dict)