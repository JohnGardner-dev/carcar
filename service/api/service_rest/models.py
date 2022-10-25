from django.db import models

# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length=100)
    number = models.IntegerField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    vin = models.CharField(max_length=50)
    owner = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField()
    technician = models.ForeignKey(
        Technician,
        related_name = "appointments",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.vin

class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin
