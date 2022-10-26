from django.http import JsonResponse
from django.shortcuts import render
from common.json import ModelEncoder
from .models import AutomobileVO, SalesRecord, SalesPerson, Customer
from django.views.decorators.http import require_http_methods
import json

# Create your views here.


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "year",
        "color",
        "manufacturer",
        "model",
        "sold",
    ]


class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_id",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]


class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "sales_price",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }


class SalesRecordDetailEncoder(ModelEncoder):
    model = SalesRecord

    properties = [
        "automobile",
        "sales_person",
        "customer",
        "sales_price",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def listSalesRecord(request):
    # list all sales records
    # create sales record
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesRecordListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        car_to_be_sold = AutomobileVO.objects.get(
            import_href=content["automobile"])
        if car_to_be_sold.sold == False:
            try:
                automobile = AutomobileVO.objects.get(
                    import_href=content["automobile"])
                content["automobile"] = automobile
            except AutomobileVO.DoesNotExist:
                return JsonResponse({"message": "Invalid automobile"})
            try:
                sales_person = SalesPerson.objects.get(
                    name=content["sales_person"])
                content["sales_person"] = sales_person
            except SalesPerson.DoesNotExist:
                return JsonResponse({"message": "Invalid Sales Person"})
            try:
                customer = Customer.objects.get(name=content["customer"])
                content["customer"] = customer
            except Customer.DoesNotExist:
                return JsonResponse({"message": "Invalid Customer"})

            record = SalesRecord.objects.create(**content)
            car_to_be_sold.sold = True
            car_to_be_sold.save()

            return JsonResponse(
                record,
                encoder=SalesRecordDetailEncoder,
                safe=False,
            )
        else:
            return JsonResponse({"message": "Car has already been sold"})


@require_http_methods(["GET", "DELETE"])
def salesRecordDetail(request, pk):
    # view SPECIFIC sales record details
    if request.method == "GET":
        record = SalesRecord.objects.get(id=pk)
        return JsonResponse(
            record,
            encoder=SalesRecordDetailEncoder,
            safe=False,
        )
    else:
        count, _ = SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


# @require_http_methods("POST")
# def createSalesPerson(request):
#     content = json.loads(request.body)
#     salesPerson = SalesPerson.objects.create(**content)
#     return JsonResponse(
#         salesPerson,
#         encoder=SalesPersonDetailEncoder,
#         safe=False,
#     )


@require_http_methods(["GET", "POST"])
def listSalesPeople(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            sales_people,
            encoder=SalesPersonDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
    salesPerson = SalesPerson.objects.create(**content)
    return JsonResponse(
        salesPerson,
        encoder=SalesPersonDetailEncoder,
        safe=False,
    )


@require_http_methods(["GET", "POST"])
def listCustomers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            customers,
            encoder=CustomerDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods("GET")
def listAutomobileVOs(request):
    content = AutomobileVO.objects.all()
    return JsonResponse(
        content,
        encoder=AutomobileVODetailEncoder,
        safe=False,
    )
