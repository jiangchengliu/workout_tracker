from django.contrib import admin
from api.models import User, WorkoutSession, Exercise

# Register your models here.

admin.site.register(User)
admin.site.register(WorkoutSession)
admin.site.register(Exercise)
