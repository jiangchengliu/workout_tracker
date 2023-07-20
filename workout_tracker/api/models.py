from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class WorkoutSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    date = models.DateField(auto_now_add=True)
    duration = models.DurationField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

class Exercise(models.Model):
    workout_session = models.ForeignKey(WorkoutSession, on_delete=models.CASCADE, related_name="exercises")
    sets = models.IntegerField(null=True, blank=True)
    reps = models.IntegerField(null=True, blank=True)
    rpe = models.IntegerField(null=True, blank=True)
    weight = models.IntegerField(null=True, blank=True)
    


    
    


