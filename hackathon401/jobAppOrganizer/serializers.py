from rest_framework import serializers
from .models import Application, Resume, ResponseTracking

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'name', 'template_file', 'created_at', 'updated_at']

class ResponseTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseTracking
        fields = '__all__'
