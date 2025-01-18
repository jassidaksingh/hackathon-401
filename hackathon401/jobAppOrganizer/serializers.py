from rest_framework import serializers
from .models import Application, Resume, ResponseTracking

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

class ResponseTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseTracking
        fields = '__all__'
