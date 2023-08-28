from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.http import JsonResponse
import requests
from configs import EDB_API_KEY, YOUTUBE_API_Key

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


# Create your views here.
class WorkoutSessionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSession.objects.none()
    serializer_class = WorkoutSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return WorkoutSession.objects.filter(user=user)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered!"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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









