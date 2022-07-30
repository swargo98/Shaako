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

        
