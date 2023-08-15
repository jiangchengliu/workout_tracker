from rest_framework import serializers
from api.models import *

class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ['reps', 'rpe', 'weight']

class ExerciseSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True)
    class Meta:
        model = Exercise
        fields = ['name', 'sets']

class WorkoutSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    class Meta:
        model = WorkoutSession
        fields = ['id', 'user', 'date', 'duration', 'notes', 'exercises']
    
    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises')
        workout_session = WorkoutSession.objects.create(**validated_data)
        for exercise_data in exercises_data:
            sets_data = exercise_data.pop('sets')
            exercise = Exercise.objects.create(workout_session=workout_session, **exercise_data)
            for set_data in sets_data:
                set_data["exercise"] = exercise
                Set.objects.create(**set_data)
        return workout_session







