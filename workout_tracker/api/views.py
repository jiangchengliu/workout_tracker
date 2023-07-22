from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.

def index(request):
    return HttpResponse('Hello World')

class WorkoutSessionView(generics.ListAPIView):
    queryset = WorkoutSession.objects.all()
    serializer_class = WorkoutSessionSerializer



