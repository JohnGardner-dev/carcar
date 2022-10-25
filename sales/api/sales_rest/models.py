from django.db import models

# Create your models here.


class AutomobileVO(models.Model):
    imported_href = models.CharField(max_length=100)
    imported_id = models.SmallIntegerField()
    color = models.CharField(max_length=30)
    year = models.SmallIntegerField()
    vin = models.CharField(max_length=50)
    model = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.vin}-{self.year} {self.manufacturer} {self.model}"


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.name} - #{self.employee_id}"


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class SalesRecord(models.Model):
    automobile = models.ForeignKey(AutomobileVO, on_delete=models.PROTECT)
    sales_person = models.ForeignKey(SalesPerson, on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    sales_price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.customer}'s sale of {self.automobile.vin}"
