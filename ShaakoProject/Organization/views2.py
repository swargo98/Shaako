from __future__ import division

import datetime
from io import BytesIO
from os.path import exists

from argon2 import PasswordHasher as ph
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from PIL import Image
from pyparsing import Or
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.response import Response
from ShaakoProject.settings import BASE_DIR
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createCampaign(request):
    if request.method == 'POST':
        print("line 25")
        data = request.data

        name = data['name']
        startDate = data['startDate']
        endDate = data['endDate']
        supervisor = data['selected']
        description = data['description']
        goal = data['goal']
        # convert startDate and endDate to datetime
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d')
        print(name, " ", startDate, " ", endDate, " ", supervisor, " ", description, " ", goal)

        if len(supervisor) != 0:
            campaign = Campaign(title=name, state_date=startDate, end_date=endDate, campaign_details=description,
                                goal=goal)
            campaign.save()
            for i in supervisor:
                id = i['id']
                # create a Supervisor_Campaign with the campaign and the id of the supervisor
                sc = Supervisor_Campaign(campaign=campaign, supervisor_id=id)
                sc.save()

                # find supervisor with id=id
                supervisor1 = Supervisor.objects.get(id=id)
                Supervisors_Notification(supervisor=supervisor1, 
                                        description="আপনার এলাকায় নতুন ক্যাম্পেইন '" + name + "' চালু করা হয়েছে",
                                        timestamp=datetime.datetime.now(),
                                        notification_type="campaign",
                                        type_id=campaign.id).save()

                # get all the chw of the supervisor
                # console.log(supervisor1)
                chw_list = CHW.objects.filter(supervisor=supervisor1)
                print(chw_list)
                for chw in chw_list:
                    newNotification = Notification(chw_id=chw, description="আপনার এলাকায় নতুন ক্যাম্পেইন '" + name + "' চালু করা হয়েছে",
                                           timestamp=datetime.datetime.now(), notification_type="campaign",
                                           type_id=campaign.id, is_read=False)
                    newNotification.save()
            return Response('True')

    return Response('False')


# @api_view(['POST'])
# def getCampaign(request):
#     if request.method == 'POST':
#         organization = request.data
#         print(organization)
#         ret = []
#         # get all supervisors of the organization
#         supervisors = Supervisor.objects.filter(organization_id=organization)
#         for i in supervisors:
#             # get all campaigns of the supervisor
#             campaigns = Campaign.objects.filter(supervisor_campaign__supervisor_id=i.id)
#             for j in campaigns:
#                 # add j in ret
#                 ret.append(j)
#         # make ret unique
#         ret = list(set(ret))
#         print(ret)
#         return Response(ret)
