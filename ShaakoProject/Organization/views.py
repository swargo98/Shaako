from __future__ import division
import datetime
import random
from email import message
from io import BytesIO
import re
from sqlite3 import TimeFromTicks

from PIL import Image
from os.path import exists

from django.shortcuts import render
from pyparsing import Or
from rest_framework import viewsets
from datetime import date

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
import names
from random import randrange
from datetime import timedelta


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getL(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        sup_id = data
        # find all contents of the supervisor with id=sup_id
        lessons = Lesson.objects.filter(supervisor_id=sup_id)
        # order lessons by creation date newest first
        lessons = lessons.order_by('-upload_date')
        ret = []
        for lesson in lessons:
            ret.append({'id': lesson.id, 'title': lesson.title, 'content': lesson.content,
                        'supervisor_name': lesson.supervisor.name, 'upload_time': lesson.upload_date.date()})
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addContent(request):
    if request.method == 'POST':
        data = request.data
        title = data['title']
        content = data['content']
        sup_id = data['sup_id']
        print(title)
        print(len(content))
        supervisor = Supervisor.objects.get(id=sup_id)
        # create new less with title and content and upload_date and save it
        newLess = Lesson(supervisor=supervisor, title=title, content=content, upload_date=datetime.datetime.now())
        newLess.save()

        chw_list = CHW.objects.filter(supervisor_id=sup_id)
        for chw in chw_list:
            # make new notification for each CHW
            newNotification = Notification(chw_id=chw, description="নতুন পাঠ '" + title + "' আপলোড করা হয়েছে",
                                           timestamp=datetime.datetime.now(), notification_type="blogpost",
                                           type_id=newLess.id, is_read=False)
            newNotification.save()
        return Response('ok')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getMyContent(request):
    if request.method == 'POST':
        lesson_id = request.data
        lesson = Lesson.objects.get(id=lesson_id)
        # print(lesson.title, lesson.content)
        return Response({'title': lesson.title, 'content': lesson.content, 'author': lesson.supervisor.name,
                         'upload_time': lesson.upload_date.date()})


def random_date(start, end):
    """
    This function will return a random datetime between two datetime
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)


def PopulateSupervisor():
    print("Heelooo world")
    # Location.objects.all().delete()
    # Campaign.objects.all().delete()
    for i in range(300):
        organization_id = 3
        first = names.get_first_name()
        last = names.get_last_name()
        name = first + " " + last
        password = ph().hash("ABCD")
        email = first + last + "@gmail.com"
        contactNo = "01715295467"
        # fetch a random row from Location table
        location = Location.objects.order_by('?').first()
        presentAddress = location.upazilla_thana + ", " + location.district + ", " + location.division
        imagePath = 'image\default.png'
        recruitment_date = random_date(date(2022, 1, 1), date(2022, 8, 28))
        # create a new Supervisor
        supervisor = Supervisor(name=name, password=password, email=email, contactNo=contactNo,
                                presentAddress=presentAddress, imagePath=imagePath, location=location,
                                organization_id=organization_id, recruitment_date=recruitment_date)

        supervisor.save()
        U = User(username=supervisor.email)
        U.save()
        token = Token.objects.create(user=U)
        token.save()
    return True


def PopulateCHW():
    print("Heelooo world CHW")
    # Location.objects.all().delete()
    # Campaign.objects.all().delete()
    for i in range(600):
        supervisor = Supervisor.objects.order_by('?').first()
        first = names.get_first_name()
        last = names.get_last_name()
        name = first + " " + last
        password = ph().hash("ABCD")
        rand = str(randrange(1, 1000))
        email = first + last + rand + "@gmail.com"
        contactNo = "01715295467"
        # fetch a random row from Location table
        # generate a random number between 1 and 1000

        location = Location.objects.order_by('?').first()
        presentAddress = location.upazilla_thana + ", " + location.district + ", " + location.division
        imagePath = 'image\default.png'
        recruitment_date = random_date(date(2022, 1, 1), date(2022, 8, 28))
        # create a new Supervisor
        chw = CHW(name=name, password=password, email=email, contactNo=contactNo,
                  presentAddress=presentAddress, imagePath=imagePath, location=location,
                  supervisor=supervisor, recruitment_date=recruitment_date)

        chw.save()
        U = User(username=chw.email)
        U.save()
        token = Token.objects.create(user=U)
        token.save()
    return True


def PopulatePatient():
    for i in range(500):
        chw = CHW.objects.get(id=randrange(800, 1096))
        contactNo = "017" + str(randrange(11111111, 99999999))
        while len(contactNo) < 11:
            contactNo = contactNo + "0"
        gender = "Female"
        if randrange(0, 2) == 0:
            gender = "Male"
        name = names.get_full_name(gender)
        location = chw.location
        address = location.upazilla_thana + ", " + location.district + ", " + location.division
        imagePath = 'image\default.png'
        date_of_birth = random_date(date(1960, 1, 1), date(2021, 8, 28))
        # create a new Supervisor
        patient = Patient(name=name, contactNo=contactNo, chw=chw, date_of_birth=date_of_birth, gender=gender,
                          address=address)

        patient.save()

    return True


def PopulateVisitForm():
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
    for i in range(300):
        # get a random patient
        patient = Patient.objects.order_by('?').first()
        chw = patient.chw
        curdate = random_date(date(2022, 1, 1), date(2022, 8, 28))
        temperature = randrange(98, 102)
        blood_pressure = randrange(120, 140)
        # assumed_disease = get a random disease from the list
        assumed_disease = random.choice(diseaselist)
        suggestions = "বেশি পানি পান করুন।"
        summary = "রোগী অসুস্থ"
        next_visit_date = random_date(curdate, date(2022, 8, 30))
        cur_symptoms = random.sample(symptomslistOld, randrange(1, 5))
        for symptom in cur_symptoms:
            if not Symptom.objects.filter(symptom_name=symptom).exists():
                Symptom.objects.create(symptom_name=symptom)
        VisitForm.objects.create(patient=patient, chw=chw, date=curdate, temperature=temperature,
                                 blood_pressure=blood_pressure, suggestions=suggestions,
                                 assumed_disease=assumed_disease,
                                 next_visit_date=next_visit_date, summary=summary)
        for symptom in cur_symptoms:
            symptom = Symptom.objects.get(symptom_name=symptom)
            visitForm = VisitForm.objects.get(date=curdate, chw=chw, patient=patient)
            SymptomForm.objects.create(visitForm=visitForm, symptom=symptom)


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
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
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
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def home(request):
    if request.method == 'GET':
        # find number entry in patient table
        patient = Patient.objects.count()
        chw = CHW.objects.count()
        supervisor = Supervisor.objects.count()
        data = [patient, chw, supervisor]
        print(request.user)
        print(request.auth)
        return Response(data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createSupervisor(request):
    print(request.data)
    print(request.user)
    print(request.auth)
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
        # find supervisor with email equals to email
        supervisor = Supervisor.objects.filter(email=email)
        ok = 1
        message = ""

        if len(name) == 0:
            ok = 0
            message += "নাম লিখুন" + "\n"
            return Response(message)
        if len(password) == 0:
            ok = 0
            message += "পাসওয়ার্ড লিখুন" + "\n"
            return Response(message)
        if len(email) == 0:
            ok = 0
            message += "ইমেইল লিখুন" + "\n"
            return Response(message)
        if len(contactNo) == 0:
            ok = 0
            message += "মোবাইল নম্বর লিখুন" + "\n"
            return Response(message)
        if len(presentAddress) == 0:
            ok = 0
            message += "ঠিকানা লিখুন" + "\n"
            return Response(message)

        if supervisor:
            ok = 0
            message += "ইমেইল প্রযুক্ত সুপারভাইজর পাওয়া গেছে" + "\n"
            return Response(message)

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
            U = User(username=supervisor.email)
            U.save()
            token = Token.objects.create(user=U)
            token.save()

            try:
                image = data['inputimage']
                img = Image.open(image)
                # find size of img in kB
                # resize image as 100kB

                width, height = img.size
                TARGET_WIDTH = 200
                coefficient = width / TARGET_WIDTH
                new_height = height / coefficient
                img = img.resize((int(TARGET_WIDTH), int(new_height)), Image.ANTIALIAS)
                img.save(str(BASE_DIR) + "\\image\\supervisor\\" + str(supervisor.id) + ".png", qualtity=95,
                         optimize=True)
            except:
                pass

            return Response('True')
        else:
            return Response('আনএক্সপেক্টেড এরর!')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSupervisorImage(request):
    data = request.data
    id = data
    path = str(BASE_DIR) + "//image//supervisor//" + str(id) + ".png"
    if not exists(path):
        path = str(BASE_DIR) + "//image//supervisor//default.png"
    im = Image.open(path)
    # send image as response
    buffered = BytesIO()
    im.save(buffered, format="PNG")
    return HttpResponse(buffered.getvalue(), content_type="image/png")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSupervisorDetailed(request):
    if request.method == 'POST':
        ret = []
        data = request.data
        organization = data
        # print(organization)
        # get all supervisor under this organization
        supervisors = Supervisor.objects.filter(organization=organization)
        for supervisor in supervisors:
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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

            # find all location which is in the same division, district and upazilla_thana
            location = Location.objects.filter(division=division, district=district, upazilla_thana=upazilla_thana)
            ret = []
            for loc in location:
                ret.append(loc.ward_union)
            return Response(ret)
    return Response('WRONG')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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

        if len(division) == 0 or division == '---':
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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSupervisor(request):
    if request.method == 'POST':
        ret = []
        data = request.data
        organization = data
        # get all supervisor under this organization
        supervisors = Supervisor.objects.filter(organization=organization)
        for supervisor in supervisors:
            location = supervisor.location
            dict = {'name': supervisor.name, 'division': location.division, 'district': location.district,
                    'upazilla_thana': location.upazilla_thana, 'recruitment_date': supervisor.recruitment_date.date(),
                    'id': supervisor.id, 'email': supervisor.email, 'contactNo': supervisor.contactNo,
                    'presentAddress': supervisor.presentAddress}
            ret.append(dict)
        return Response(ret)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
            U = User(username=chw.email)
            U.save()
            token = Token.objects.create(user=U)
            token.save()

            Supervisors_Notification(supervisor=supervisor, 
                                        description="আপনার অধীনে নতুন স্বাস্থ্যকর্মী '" + name + "' কে যুক্ত করা হয়েছে",
                                        timestamp=datetime.datetime.now(),
                                        notification_type="chw",
                                        type_id=chw.id).save()

            return Response('True')

    return Response('False')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteSupervisor(request):
    if request.method == 'POST':
        data = request.data
        id = data
        supervisor = Supervisor.objects.get(id=id)
        supervisor.delete()
        return Response('True')
    return Response('False')


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def searchSupervisor(request):
    if request.method == 'POST':
        data = request.data
        searchtext = data['search']
        organization = data['organization']
        # get all supervisor under this organization
        supervisors = Supervisor.objects.filter(organization=organization)
        ret = []
        for supervisor in supervisors:
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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAgeWiseDiseaseStat(request):
    if request.method == 'POST':
        organization = request.data['organization']
        inputdivision = request.data['inputdivision']
        inputdistrict = request.data['inputdistrict']
        inputupazilla = request.data['inputupazilla']
        if inputdivision == '---':
            inputdivision = ''
        if inputdistrict == '---':
            inputdistrict = ''
        if inputupazilla == '---':
            inputupazilla = ''
        supervisors = Supervisor.objects.filter(organization_id=organization)
        chws = CHW.objects.filter(supervisor_id__in=supervisors)
        if len(inputdivision) != 0 and len(inputdistrict) == 0 and len(inputupazilla) == 0:
            # find all CHW of this division
            chws = CHW.objects.filter(supervisor_id__in=supervisors, location__division=inputdivision)
        elif len(inputdivision) != 0 and len(inputdistrict) != 0 and len(inputupazilla) == 0:
            # find all CHW of this division
            chws = CHW.objects.filter(supervisor_id__in=supervisors, location__division=inputdivision,
                                      location__district=inputdistrict)
        elif len(inputdivision) != 0 and len(inputdistrict) != 0 and len(inputupazilla) != 0:
            # find all CHW of this division
            chws = CHW.objects.filter(supervisor_id__in=supervisors, location__division=inputdivision,
                                      location__district=inputdistrict, location__upazilla_thana=inputupazilla)
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

        # if there are more than 10 entries then keep  10 entries with most value
        if len(diseases) > 10:
            diseases = sorted(diseases.items(), key=lambda x: x[1], reverse=True)[:10]
            # dictionary
            diseases = dict(diseases)

        xs = [0, 6, 11, 18, 51]
        ys = [5, 10, 17, 50, 500]
        ret = []
        for i in range(len(xs)):
            p = int(xs[i])
            q = int(ys[i])
            dictionary = {}
            for disease in diseases:
                if disease == 'None':
                    continue
                dictionary[disease] = 0
                for patient in patients:
                    # get the date_of_birth of patient
                    date_of_birth = patient.date_of_birth
                    # get the age of patient
                    age = date.today().year - date_of_birth.year
                    age = int(age)
                    # print(age, p , q)
                    if age < p or age > q:
                        continue

                    # get the latest VisitForm of this patient
                    # if no VisitForm then continue
                    try:
                        latest_visit = VisitForm.objects.filter(patient_id=patient.id).order_by('-date').first()
                        dictionary[latest_visit.assumed_disease] += 1
                    except:
                        pass
            ret.append(dictionary)

        print(ret)
        return Response(ret)
