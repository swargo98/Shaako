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
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ShaakoProject.settings import BASE_DIR

from .models import *
from .serializers import *


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getProfile(request):
    if request.method == 'POST':
        print("line 25")
        organizationAdminID = request.data
        print(organizationAdminID)

        # get all information of the organizationAdmin
        organizationAdmin = OrganizationAdmin.objects.values('name', 'password', 'email', 'contactNo',
                                                             'presentAddress').filter(id=organizationAdminID)
        # create dictionary with all information
        print(organizationAdmin)
        ret = {'name': organizationAdmin[0]['name'], 'password': organizationAdmin[0]['password'],
               'email': organizationAdmin[0].get('email', None),
               'contactNo': organizationAdmin[0].get('contactNo', None),
               'presentAddress': organizationAdmin[0].get('presentAddress', None)}

        print(ret)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    if request.method == 'POST':
        data = request.data
        id = data['id']
        name = data['name']
        password = data['password']
        password2 = data['password2']
        passwordOld = data['passwordOld']
        passwordOld2 = data['passwordOld2']
        email = data['email']

        if password == password2:
            print("line 50")
            # match argon2 hash of passwordOld2 with passwordOld with try/except
            try:
                ph().verify(passwordOld, passwordOld2)
                print("line 53")

                # update OrganizationAdmin with name, password, email, contactNo, presentAddress
                passwordHash = ph().hash(password)
                OrganizationAdmin.objects.filter(id=id).update(name=name, password=passwordHash,
                                                                            email=email)
                print("line 62")
                return Response({"success": "True"})

            except:
                print("line 68")
                return Response({"success": "False"})
        # if ph().verify(passwordOld2, passwordOld):
        #     #update password, name, email
        #     print("line 51")
        #     # get hash of password
        #     passwordHash = ph().hash(password)
        #     OrganizationAdmin.objects.filter(id=request.user.id).update(name=name, password=passwordHash, email=email)
        #     return Response({'success': True})
        # else:
        #     return Response({'success': False, 'error': 'Password does not match'})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSymptomsList(request):
    if request.method == 'POST':
        print("line 94")

        diseaselist = ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
                       'Peptic ulcer diseae', 'AIDS', 'Diabetes ',
                       'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine', 'Cervical spondylosis',
                       'Paralysis (brain hemorrhage)',
                       'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A', 'Hepatitis B',
                       'Hepatitis C', 'Hepatitis D',
                       'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia',
                       'Dimorphic hemmorhoids(piles)',
                       'Heart attack', 'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia',
                       'Osteoarthristis',
                       'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection',
                       'Psoriasis', 'Impetigo']

        symptomslist = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills',
                        'joint_pain',
                        'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting',
                        'burning_micturition', 'spotting_ urination',
                        'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss',
                        'restlessness', 'lethargy',
                        'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes',
                        'breathlessness', 'sweating',
                        'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea',
                        'loss_of_appetite', 'pain_behind_the_eyes',
                        'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
                        'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
                        'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
                        'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain',
                        'weakness_in_limbs',
                        'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
                        'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
                        'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
                        'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
                        'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck',
                        'swelling_joints',
                        'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
                        'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
                        'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
                        'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body',
                        'belly_pain',
                        'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite',
                        'polyuria', 'family_history', 'mucoid_sputum',
                        'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
                        'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
                        'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum',
                        'prominent_veins_on_calf',
                        'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring',
                        'skin_peeling',
                        'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister',
                        'red_sore_around_nose',
                        'yellow_crust_ooze']

        alphabaticsymptomslist = sorted(symptomslist)


        # alphabaticsymptomslist = alphabaticsymptomslist[:10]

        ret = {'list': alphabaticsymptomslist}

        print(ret)
        return Response(ret)

