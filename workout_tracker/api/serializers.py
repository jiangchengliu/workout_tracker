from rest_framework import serializers
from api.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields did not match"})
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()
        return user


class SetSerializer(serializers.ModelSerializer):
    weight = serializers.IntegerField(required=False, allow_null=True)
    class Meta:
        model = Set
        fields = ['id', 'reps', 'rpe', 'weight']

class ExerciseSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True)
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'sets']

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







