from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Application, Resume, ResponseTracking

# Helper function to parse request body
def parse_request_body(request):
    return json.loads(request.body.decode("utf-8"))

# Applications Views
@method_decorator(csrf_exempt, name='dispatch')  # Apply CSRF exemption to the entire class
class ApplicationsView(View):
    def get(self, request):
        applications = list(Application.objects.values())
        return JsonResponse(applications, safe=False)

    def post(self, request):
        data = parse_request_body(request)
        application = Application.objects.create(
            company_name=data.get("company_name"),
            position=data.get("position"),
            date_applied=data.get("date_applied"),
            status=data.get("status", "APPLIED"),
            notes=data.get("notes", "")
        )
        return JsonResponse({"id": application.id}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class ApplicationDetailView(View):
    def get(self, request, pk):
        application = get_object_or_404(Application, pk=pk)
        return JsonResponse({
            "id": application.id,
            "company_name": application.company_name,
            "position": application.position,
            "date_applied": application.date_applied,
            "status": application.status,
            "notes": application.notes,
        })

    def put(self, request, pk):
        data = parse_request_body(request)
        application = get_object_or_404(Application, pk=pk)
        for field, value in data.items():
            setattr(application, field, value)
        application.save()
        return JsonResponse({"message": "Application updated successfully."})

    def delete(self, request, pk):
        application = get_object_or_404(Application, pk=pk)
        application.delete()
        return JsonResponse({"message": "Application deleted successfully."})

# Resumes Views
@method_decorator(csrf_exempt, name='dispatch')
class ResumesView(View):
    def get(self, request):
        resumes = list(Resume.objects.values())
        return JsonResponse(resumes, safe=False)

    def post(self, request):
        data = parse_request_body(request)
        resume = Resume.objects.create(name=data.get("name"), template_file=data.get("template_file"))
        return JsonResponse({"id": resume.id}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class ResumeDetailView(View):
    def get(self, request, pk):
        resume = get_object_or_404(Resume, pk=pk)
        return JsonResponse({
            "id": resume.id,
            "name": resume.name,
            "template_file": resume.template_file.url,
        })

    def put(self, request, pk):
        data = parse_request_body(request)
        resume = get_object_or_404(Resume, pk=pk)
        resume.name = data.get("name", resume.name)
        resume.save()
        return JsonResponse({"message": "Resume updated successfully."})

    def delete(self, request, pk):
        resume = get_object_or_404(Resume, pk=pk)
        resume.delete()
        return JsonResponse({"message": "Resume deleted successfully."})

# Responses Views
@method_decorator(csrf_exempt, name='dispatch')
class ResponsesView(View):
    def get(self, request, application_id):
        responses = list(ResponseTracking.objects.filter(job_application_id=application_id).values())
        return JsonResponse(responses, safe=False)

    def post(self, request):
        data = parse_request_body(request)
        response = ResponseTracking.objects.create(
            job_application_id=data.get("job_application"),
            response_type=data.get("response_type"),
            response_date=data.get("response_date"),
            comments=data.get("comments", "")
        )
        return JsonResponse({"id": response.id}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class ResponseDetailView(View):
    def get(self, request, pk):
        response = get_object_or_404(ResponseTracking, pk=pk)
        return JsonResponse({
            "id": response.id,
            "job_application": response.job_application_id,
            "response_type": response.response_type,
            "response_date": response.response_date,
            "comments": response.comments,
        })

    def put(self, request, pk):
        data = parse_request_body(request)
        response = get_object_or_404(ResponseTracking, pk=pk)
        for field, value in data.items():
            setattr(response, field, value)
        response.save()
        return JsonResponse({"message": "Response updated successfully."})

    def delete(self, request, pk):
        response = get_object_or_404(ResponseTracking, pk=pk)
        response.delete()
        return JsonResponse({"message": "Response deleted successfully."})
