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

import joblib as jb
import datetime

from datetime import date

def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

model = jb.load('trained_model')

symptomslistOld = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills',
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
alphabaticsymptomslist = sorted(symptomslistOld)

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

        PatientID = request.data
        print("PatientID : {0}".format(PatientID))

        # get all information of the patient with id = PatientID
        patient = Patient.objects.get(id=PatientID)

        print("patient : {0}".format(patient))

        name = patient.name
        date_of_birth = patient.date_of_birth
        gender = patient.gender

        # calculate age
        age = calculate_age(date_of_birth)

        #get patient name

        # print(patient_id)



        # alphabaticsymptomslist = alphabaticsymptomslist[:10]

        ret = {'list': alphabaticsymptomslist, 'name': name, 'age': age, 'gender': gender}

        print(ret)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPrediction(request):
    if request.method == 'POST':
        print("line 25")
        data = request.data
        psymptoms = data['selectedItems']

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

        symptomslist = sorted(symptomslistOld)
        inputno = len(psymptoms)
        print(inputno)
        if (inputno == 0):
            return JsonResponse({'predicteddisease': "none", 'confidencescore': 0})

        else:

            print(psymptoms)

            """      #main code start from here...
            """

            testingsymptoms = []
            # append zero in all coloumn fields...
            for x in range(0, len(symptomslist)):
                testingsymptoms.append(0)

            # update 1 where symptoms gets matched...
            for k in range(0, len(symptomslist)):
                for z in psymptoms:
                    symptom_name = symptomslist[int(z)]
                    index = symptomslistOld.index(symptom_name)
                    testingsymptoms[index] = 1
                    print(symptomslistOld[index])

            inputtest = [testingsymptoms]

            print(inputtest)

            predicted = model.predict(inputtest)
            print("predicted disease is : ")
            print(predicted)

            y_pred_2 = model.predict_proba(inputtest)
            confidencescore = y_pred_2.max() * 100
            print(" confidence score of : = {0} ".format(confidencescore))

            confidencescore = format(confidencescore, '.0f')
            # convert to string...
            confidencescore = str(confidencescore)

            predicted_disease = predicted[0]

            return JsonResponse({'predicteddisease': predicted_disease, 'confidencescore': confidencescore})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addVisitForm(request):
    symptomslist = sorted(symptomslistOld)

    if request.method == 'POST':
        print("inside addVisitForm")
        # selectedItems, chw_id, temperature, bloodPressure, suggestion, assumedDisease, nextVisit, summary
        data = request.data
        patient_id = data['patient_id']
        selectedItems = data['selectedItems']
        chw_id = data['chw_id']
        temperature = data['temperature']
        bloodPressure = data['bloodPressure']
        suggestion = data['suggestion']
        assumedDisease = data['assumedDisease']
        nextVisit = data['nextVisit']
        summary = data['summary']

        #print all fetched data...
        print("selectedItems : {0}".format(selectedItems))
        print(chw_id)
        print("temperature : {0}".format(temperature))
        print("bloodPressure : {0}".format(bloodPressure))
        print("suggestion : {0}".format(suggestion))
        print("assumedDisease : {0}".format(assumedDisease))
        print("nextVisit : {0}".format(nextVisit))
        print("summary : {0}".format(summary))

        # get symptoms from selectedItems...
        symptoms = []
        for x in selectedItems:
            symptoms.append(symptomslist[int(x)])

        #print symptoms...
        print("symptoms : {0}".format(symptoms))

        #add symptoms to database if not already present...
        for symptom in symptoms:
            if not Symptom.objects.filter(symptom_name=symptom).exists():
                Symptom.objects.create(symptom_name=symptom)

        #find patient with id = patient_id...
        patient = Patient.objects.get(id=patient_id)

        #find chw with id = chw_id
        chw = CHW.objects.get(id=chw_id)

        #get current date and time
        current_date = datetime.datetime.now()

        #format nextVisit date
        nextVisit = datetime.datetime.strptime(nextVisit, '%d/%m/%Y')

        #save visit form to database...
        VisitForm.objects.create(patient=patient, chw=chw, date=current_date, temperature=temperature, blood_pressure=bloodPressure, suggestions=suggestion, assumed_disease=assumedDisease, next_visit_date=nextVisit, summary=summary)

        #save relationship between symptoms and visit form to database...
        for symptom in symptoms:
            symptom = Symptom.objects.get(symptom_name=symptom)
            visitForm = VisitForm.objects.get(date=current_date, chw=chw, patient=patient)
            SymptomForm.objects.create(visitForm=visitForm, symptom=symptom)

        return Response("True")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatientProfile(request):
    if request.method == 'POST':
        print("line 362")
        FormID = request.data
        print(FormID)

        #get all inforation from visit form with id = FormID...
        visitForm = VisitForm.objects.get(id=FormID)
        chw = visitForm.chw
        date = visitForm.date.date()
        temperature = visitForm.temperature
        blood_pressure = visitForm.blood_pressure
        suggestions = visitForm.suggestions
        assumed_disease = visitForm.assumed_disease
        next_visit_date = visitForm.next_visit_date.date()
        summary = visitForm.summary
        symptoms = SymptomForm.objects.filter(visitForm=visitForm)

        #make list of symptoms...
        symptoms_list = []
        for symptom in symptoms:
            symptoms_list.append(symptom.symptom.symptom_name)

        print(symptoms_list)

        #get patient from visit form with id = FormID...
        PatientID = VisitForm.objects.get(id=FormID).patient.id
        print("PatientID : {0}".format(PatientID))

        # get all information of the patient with id = PatientID
        patient = Patient.objects.get(id=PatientID)

        print("patient : {0}".format(patient))
        #name, chwId, address, contact no, date_of_birth, gender
        name = patient.name
        chw = patient.chw
        print("chwId : {0}".format(chw))
        address = patient.address
        contactNo = patient.contactNo
        date_of_birth = patient.date_of_birth
        gender = patient.gender


        #get chw name from chw
        chwName = chw.name
        print("chwName : {0}".format(chwName))

        #calculate age
        age = calculate_age(date_of_birth)

        #get all visit forms of the patient with id = PatientID sorted by date
        visitForms = VisitForm.objects.filter(patient=patient).order_by('-date')

        #print number of visit forms
        print("number of visit forms : {0}".format(len(visitForms)))

        #make list of visit forms id and date
        visitFormsId = []
        visitFormsDate = []
        for visitForm in visitForms:
            visitFormsId.append(visitForm.id)
            visitFormsDate.append(visitForm.date.date())

        # create dictionary with all information
        patientProfile = {'name': name, 'address': address, 'contactNo': contactNo,
                          'age': age, 'gender': gender, 'chwName': chwName, 'visitFormsId': visitFormsId,
                          'visitFormsDate': visitFormsDate, 'temperature': temperature, 'blood_pressure': blood_pressure,
                          'suggestions': suggestions, 'assumed_disease': assumed_disease, 'next_visit_date': next_visit_date,
                          'summary': summary, 'symptoms': symptoms_list, 'date': date}

        print(patientProfile)
        return Response(patientProfile)

