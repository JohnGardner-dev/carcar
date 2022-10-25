from django.urls import path
from .views import api_list_appointment, api_delete_appointment, api_list_technician

urlpatterns = [
    path("appointments/", api_list_appointment, name= "api_list_appointments"),
    path("appointments/<int:pk>", api_delete_appointment, name= "api_delete_appointments"),
    path("technicians/", api_list_technician, name = "api_list_technicians")
]
