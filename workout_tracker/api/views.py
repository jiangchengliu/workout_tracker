from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import *
from .serializers import *
from django.http import JsonResponse
import requests
from configs import EDB_API_KEY



# Create your views here.

def index(request):
    return HttpResponse('Hello World')

class WorkoutSessionView(generics.ListAPIView):
    queryset = WorkoutSession.objects.all()
    serializer_class = WorkoutSessionSerializer

class WorkoutSessionDelete(generics.DestroyAPIView):
    queryset = WorkoutSession.objects.all()
    serializer_class = WorkoutSessionSerializer

def get_exercises(request):
    url = "https://exercisedb.p.rapidapi.com/exercises"

    headers = {
        "X-RapidAPI-Key": EDB_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json(), safe=False)




