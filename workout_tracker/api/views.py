from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import routers
from .models import *
from .serializers import *
from django.http import JsonResponse
import requests
from configs import EDB_API_KEY, YOUTUBE_API_Key



# Create your views here.
class WorkoutSessionViewSet(viewsets.ModelViewSet):
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

def get_exercise(request, id):
    url = f"https://exercisedb.p.rapidapi.com/exercises/exercise/{id}"

    headers = {
        "X-RapidAPI-Key": EDB_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    return JsonResponse(response.json(), safe=False)

def youtube_videos(request, query):
    API_KEY = YOUTUBE_API_Key
    url = f'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&type=video&key={API_KEY}'
    response = requests.get(url)
    return JsonResponse(response.json(), safe=False)





