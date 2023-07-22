from rest_framework import serializers
from api.models import *

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    set = SetSerializer(many=True, read_only=True)
    class Meta:
        model = Exercise
        fields = '__all__'

class WorkoutSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    class Meta:
        model = WorkoutSession
        fields = '__all__'






