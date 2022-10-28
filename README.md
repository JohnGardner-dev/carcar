# <center>**CarCar**


<center>

# **Team**
---
**Sophie Nguyen** -- Service API
**John Gardner** -- Sales API
---

</center>


<br><br>


# <center>**Diagram of Architecture**

---

<br>

<p align="center">
	<img src="https://i.imgur.com/3UK7S6L.png"/>
</p>
<br><br><br>

# <center>**Service Microservice**
---

<br><br>

## **Models**

---
### **Appointment Model** -- (used to create a service appointment)

>When creating a service appointment, the following properties are needed: VIN of vehicle, vehicle owner, date and time of appointment, reason, and assigned technician. There is also a completed property that has its default set to “False”
There is a foreign key to the Technician Model to see which technicians there are


| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**               				|
| :-------------: | :------------: | :------------------------------------------|
|   "vin"         |  `CharField`   | `max_length: 50 (required)`  				|
|  "owner"		  |  `CharField`   | `max_length: 100 (required)` 				|
|  "date"		  |  `DateField`   |   							  				|
|  "time"		  |  `TimeField`   | 							  				|
|  "reason"		  |  `TextField`   |    						  				|
|  "technician"	  |  `ForeignKey`  | `Technician`<br>`on_delete=models.CASCADE` |
|  "completed"	  |  `BooleanField`| `default = False`<br> `null=True`  		|

<br><br>

### **Technician Model** -- (used to create a technician)

>When creating a technician, the following properties are needed: name and employee number


| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**               				|
| :-------------: | :------------: | :------------------------------------------|
|  "name"         |  `CharField`   | `max_length: 100 (required)`  				|
|  "number"		  |  `IntegerField`| 											|


<br><br>

### **AutomobileVO Model** -- (used to create an Automobile)

> This model is a value object that is used for polling the inventory api. We have set up polling so that every minute or so, the inventory api sends their automobile data to service. The service microservice then takes that data and either creates or updates the automobile as an instance of the AutomobileVO.


| **MODEL FIELD** | **FIELD TYPE** 			  | **OTHER ARGS**       		|
| :-------------: | :------------------------:| :---------------------------|
|  "color"        |  `CharField`   			  | `max_length: 50 (required)` |
|  "year"    	  |`PositiveSmallIntegerField`| 							|
|  "vin"         |  `CharField`   			  | `max_length: 17 (required)` |
|  "import_href" |  `CharField`				  | `max_length: 200 (required)`|


<br><br>


## **API Views**

---
<br>

### **Appointments :**


| **REQUEST METHOD** |                     **FUNCTION**                      |                     **ENDPOINT**                     |
| :----------------: | :---------------------------------------------------: | :--------------------------------------------------: |
|       `GET`        |                   list appointments                   |       http://localhost:8080/api/appointments/        |
|       `POST`       |                  create appointment                   |       http://localhost:8080/api/appointments/        |
|      `DELETE`      |                  delete appointment                   |     http://localhost:8080/api/appointments/:id/      |
|       `PUT`        | update appointment's <br>"completed" property to True | http://localhost:8080/api/appointments/:id/complete/ |

<br>

### **Technicians :**


| **REQUEST METHOD** |   **FUNCTION**    |              **ENDPOINT**              |
| :----------------: | :---------------: | :------------------------------------: |
|       `GET`        | list technicians  | http://localhost:8080/api/technicians/ |
|       `POST`       | create technician | http://localhost:8080/api/technicians/ |


<br>

# <center>**Sales Microservice**
---

## **Models**

---

### **AutomobileVO Model** -- (Value object of Automobiles model in Inventory Microservice)

>This model is a value object that is used for polling the inventory api. We have set up polling so that every minute or so, the Sales Poller gets the automobile data from Inventory API. The Sales Microservice then takes that data and either creates or updates the automobile as an instance of the AutomobileVO.

<br><br>

### **SalesPerson Model** -- (used to create a Sales Person)

>When creating a Sales Person, the following properties are needed: "name" and "employee_id"


| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**               |
| :-------------: | :------------: | :--------------------------- |
|     "name"      |  `CharField`   | `max_length: 100 (required)` |
|  "employee_id   |  `CharField`   | `max_length: 25 (required)`  |

<br><br>

### **Customer Model** -- (used to create a Customer)

> When creating a Customer, the following properties are needed: "name", "address", and "phone_number"

| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**               |
| :-------------: | :------------: | :--------------------------- |
|     "name"      |  `CharField`   | `max_length: 100 (required)` |
|    "address"    |  `CharField`   | `max_length: 100 (required)` |
| "phone_number"  |  `CharField`   | `max_length: 10 (required)`  |

<br><br>

### **SalesRecord Model** -- (used to create a Sales Record)

> When creating a Sales Record, the following properties are needed: "automobile", "sales_person", "customer", "sales_price"

| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**                                 |
| :-------------: | :------------: | :--------------------------------------------- |
|  "automobile"   |  `ForeignKey`  | `AutomobileVO`<br>`on_delete=models.PROTECT`   |
| "sales_person"  |  `ForeignKey`  | `SalesPerson`<br>`on_delete=models.DO_NOTHING` |
|   "customer"    |  `ForeignKey`  | `Customer`<br>`on_delete=models.DO_NOTHING`    |
|  "sales_price"  |  `FloatField`  | `none`                                         |

<br><br>

## **API Views**

---
<br>

### **Sales Records :**


| **REQUEST METHOD** |        **FUNCTION**         | **ENDPOINT**                           |
| -----------------: | :-------------------------: | :------------------------------------- |
|              `GET` |     list Sales Records      | http://localhost:8090/api/records/     |
|             `POST` |     create Sales Record     | http://localhost:8090/api/records/     |
|              `GET` | get details of Sales Record | http://localhost:8090/api/records/:id/ |
|           `DELETE` |     delete Sales Record     | http://localhost:8090/api/records/:id/ |

<br>

### **Customers :**


| **REQUEST METHOD** |  **FUNCTION**   | **ENDPOINT**                         |
| -----------------: | :-------------: | :----------------------------------- |
|              `GET` | list Customers  | http://localhost:8090/api/customers/ |
|             `POST` | create Customer | http://localhost:8090/api/customers/ |


<br>

### **Sales Persons :**


| **REQUEST METHOD** |    **FUNCTION**     | **ENDPOINT**                            |
| -----------------: | :-----------------: | :-------------------------------------- |
|              `GET` | list Sales Persons  | http://localhost:8090/api/salespersons/ |
|             `POST` | create Sales Person | http://localhost:8090/api/salespersons/ |

<br>

### **Automobile VOs :**


| **REQUEST METHOD** |    **FUNCTION**     | **ENDPOINT**                         |
| -----------------: | :-----------------: | :----------------------------------- |
|              `GET` | list Automobile VOs | http://localhost:8090/api/inventory/ |

<br>

<br>

# <center>**Key React Features**
---

### **Success message after a form submits**

> After successfully submitting a form, a picture of approval will take the place of the form. I set this up by using Element.classList in the submit handler.  If the response of the submit was ok, I was able to use Element.classList to delete “d-none” from the div class that had the success picture and add “d-none” to the div that contained the form

### **List of Service Appointments**

> This list shows all appointments in the application. However, these appointments are being filtered to show appointments that have the “completed” property as “False”. That way, when an appointment is completed, the user can click the “completed” button, which will update the completed property to “True” for the appointment., then the appointment will not show up on this list anymore.

### **VIP?**

> This feature checks to see if the VIN of the appointment is a VIN in Inventory.  This is where the AutomobileVO is used. If the VIN is present in Inventory, the customer is a VIP because they bought their car from the same dealership. This logic is done on the back-end using “get_extra_data” in the AppointmentListEncoder. If the VIN is present in the AutomobileVO (which is a value object that should be updating with automobiles, VIN included, from the inventory), the VIP property is “True”.

### **Service Appointments History**

> This feature allows the user to search from all service appointments based on a VIN. This is done with just a function and hook. I used a hook to set the input in the search bar and used that input as a filter for my list of appointments


<br>

# **Getting the App Started**
---

1. Git clone into your local repository
	`git clone <<repo>>`
2. cd into it
   `cd project-beta`
3. Create a volume and name it beta-data
	`docker volume create beta-data`
4. Build the image
	`docker compose build`
5. Run the container
	`docker compose up`
6.  Open browser to http://localhost:3000 to make sure it’s running
7.  Once it’s up and running, you can begin putting in data! The flow of the NavBar is representative of the flow of data. Start with Manufacturer, then Vehicle Models, then Automobile, and so on.
