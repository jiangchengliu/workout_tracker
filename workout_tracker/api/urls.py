from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('WorkoutHistory', WorkoutSessionView.as_view()),
    path('WorkoutHistoryDelete/<int:pk>', WorkoutSessionDelete.as_view()),
    path('exercises', get_exercises),
     path('exercises/<str:id>', get_exercise),
]