from django.urls import path
from . import views

app_name = "jobAppOrganizer"

urlpatterns = [
    path('applications/', views.ApplicationsView.as_view(), name='list_applications'),
    path('applications/<int:pk>/', views.ApplicationDetailView.as_view(), name='application_detail'),
    path('resumes/', views.ResumeListView.as_view(), name='list_resumes'),
    path('resumes/<int:pk>/', views.ResumeDetailView.as_view(), name='resume_detail'),
    path('responses/<int:application_id>/', views.ResponsesView.as_view(), name='list_responses'),
    path('responses/<int:pk>/', views.ResponseDetailView.as_view(), name='response_detail'),
]