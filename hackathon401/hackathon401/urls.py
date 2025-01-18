"""
URL configuration for hackathon401 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
import jobAppOrganizer.views as views


urlpatterns = [
    path('api/applications/', views.ApplicationsView.as_view(), name='list_applications'),
    path('api/applications/<int:pk>/', views.ApplicationDetailView.as_view(), name='application_detail'),
    path('api/resumes/', views.ResumesView.as_view(), name='list_resumes'),
    path('api/resumes/<int:pk>/', views.ResumeDetailView.as_view(), name='resume_detail'),
    path('api/responses/<int:application_id>/', views.ResponsesView.as_view(), name='list_responses'),
    path('api/responses/<int:pk>/', views.ResponseDetailView.as_view(), name='response_detail'),
]
