from django.urls import path
from .views import api_list_appointment, api_delete_appointment, api_list_technician, api_complete_appointment

urlpatterns = [
    path("appointments/", api_list_appointment, name= "api_list_appointments"),
    path("appointments/<int:pk>", api_delete_appointment, name= "api_delete_appointments"),
    path("appointments/<int:pk>/complete/", api_complete_appointment, name= "api_complete_appointments"),
    path("technicians/", api_list_technician, name = "api_list_technicians")
]
