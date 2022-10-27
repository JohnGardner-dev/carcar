from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
import json

# Create your views here.

class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "color", "year"]

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "number","id"]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "owner",
        "id",
        "date" ,
        "time" ,
        "reason",
        "technician",
        "completed",
        ]
    encoders = {
        'technician': TechnicianListEncoder()
    }

    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        if count > 0:
            return {"vip": "True"}
        else:
            return {"vip": "False"}



@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method== "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder = AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid Technician Number"},
            status=400,)
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder = AppointmentListEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def api_delete_appointment(request,pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["PUT"])
def api_complete_appointment(request,pk):
    if request.method == "PUT":
        Appointment.objects.filter(id=pk).update(completed="True")
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianListEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            content,
            encoder=TechnicianListEncoder,
            safe= False
        )
