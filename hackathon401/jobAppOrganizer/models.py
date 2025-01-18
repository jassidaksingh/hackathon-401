from django.db import models

STATUS_CHOICES = [
    ('APPLIED', 'Applied'),
    ('INTERVIEW', 'Interview'),
    ('OFFER', 'Offer'),
    ('REJECTION', 'Rejection'),
]

class Application(models.Model):
    company_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    date_applied = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='APPLIED')
    notes = models.TextField(blank=True, null=True)


    def __str__(self):
        return f"{self.position} at {self.company_name} ({self.get_status_display()})"
    

class Resume(models.Model):
    name=models.CharField(max_length=100)
    template_file = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_master = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({'Master' if self.is_master else 'Tailored'})"
    

class ResponseTracking(models.Model):
    RESPONSE_CHOICES = [
    ('INTERVIEW', 'Interview'),
    ('REJECTION', 'Rejection'),
    ('OFFER', 'Offer'),
]


    job_application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='responses')
    response_type = models.CharField(max_length=20, choices=RESPONSE_CHOICES)
    response_date = models.DateField()
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.response_type} for {self.job_application}"
