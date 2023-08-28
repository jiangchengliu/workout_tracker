from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'workouts', WorkoutSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('exercises', get_exercises),
    path('exercises/<str:id>', get_exercise),
    path('related_videos/<str:query>', youtube_videos),
    path('register/', RegisterView.as_view(), name='register')
]