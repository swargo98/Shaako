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
