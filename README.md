# CarCar

Team:

* Sophie Nguyen - Service API
* John Gardner - Sales API

## Design

## Service microservice

* Models
	* Appointment Model - used to create a service appointment
		* When creating a service appointment, the following properties are needed: VIN of vehicle, vehicle owner, date and time of appointment, reason, and assigned technician. There is also a completed property that has its default set to “False”.
		* There is a foreign key to the Technician Model to see which technicians there are
	* Technician Model - used to create a Technician
		* When creating a technician, the following properties are needed: name and employee number
	* AutomobileVO model - Value object of Automobiles model in Inventory microservice
		* This model is a value object that is used for polling the inventory api.
		* We have set up polling so that every minute or so, the inventory api sends their automobile data to service. The service microservice then takes that data and either creates or updates the automobile as an instance of the AutomobileVO.
* API Views
	* Appointments
		* GET and POST- Lists all or creates a service appointment
			* http://localhost:8080/api/appointments/
		* DELETE - deletes a service
			* http://localhost:8080/api/appointments/:id/
		* PUT - updates the “completed” property on the model to “True”
			* http://localhost:8080/api/appointments/:id/complete/
	* Technicians
		* GET and POST - Lists all or creates a technician
			* http://localhost:8080/api/technicians/
* Key Features on React
	* Success message after a form submits
		* After successfully submitting a form, a picture of approval will take the place of the form. I set this up by using Element.classList in the submit handler.  If the response of the submit was ok, I was able to use Element.classList to delete “d-none” from the div class that had the success picture and add “d-none” to the div that contained the form
	* List of Service Appointments
		* This list shows all appointments in the application. However, these appointments are being filtered to show appointments that have the “completed” property as “False”. That way, when an appointment is completed, the user can click the “completed” button, which will update the completed property to “True” for the appointment., then the appointment will not show up on this list anymore.
		* VIP?
			* This feature checks to see if the VIN of the appointment is a VIN in Inventory.  This is where the AutomobileVO is used. If the VIN is present in Inventory, the customer is a VIP because they bought their car from the same dealership. This logic is done on the back-end using “get_extra_data” in the AppointmentListEncoder. If the VIN is present in the AutomobileVO (which is a value object that should be updating with automobiles, VIN included, from the inventory), the VIP property is “True”.
	* Service Appointments History
		* This feature allows the user to search from all service appointments based on a VIN. This is done with just a function and hook. I used a hook to set the input in the search bar and used that input as a filter for my list of appointments

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

## Getting the App started

1. Git clone into your local repository
	* `git clone <<repo>>`

2. cd into it
	* `cd project-beta`

4. Create a volume and name it beta-data
	* `docker volume create beta-data`

5. Build the image
	* `docker compose build`

6. Run the container
	* `docker compose up`

7. Open browser to localhost:3000 to make sure it’s running

8. Once it’s up and running, you can begin putting in data! The flow of the NavBar is representative of the flow of data. Start with Manufacturer, then Vehicle Models, then Automobile, and so on.

## Inputting data through Insomnia using the POST method

	* Add a Manufacturer
		* http://localhost:8100/api/manufacturers/
		* {
			"name": "Ford"
		}

	* Add a Vehicle Model
		* http://localhost:8100/api/models/
		* {
			"name": "Mustang",
  			"manufacturer_id": "1",
			"picture_url": "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/640x400/quality/80/https://s.aolcdn.com/commerce/autodata/images/USD20FOC051B021001.jpg"
		}

	* Add an Automobile Vehicle
		* http://localhost:8100/api/automobiles/
		*  {
	 		"color": "black",
	 		"year": 2020,
	 		"vin": "123456789",
	 		"model_id": 1
		}

	* Add a Technician
		* http://localhost:8080/api/technicians/
		* 	{
			"name": "Jack",
			"number": 12345
		}

	* Add a Service Appointment
		* http://localhost:8080/api/appointments/
		*  {
	 		"vin": "123456789",
	 		"owner": "you",
	 		"date": "2022-10-24",
	 		"time": "5:30:00",
	 		"reason": "Tire Alignment",
	 		"technician": 1
		}

	* Add a Sales Person
		* http://localhost:8090/api/salespersons/
		* 	{
			"name": "jack",
			"employee_id": "001"
		}

	* Add a customer
		* http://localhost:8090/api/customers/
		*  {
			"name": "Joe",
			"address": "123 Main St",
			"phone_number": "123456789"
		}

	* Add a Sales Record
		* http://localhost:8090/api/records/
		* {
			"automobile": "/api/automobiles/123456789/",
			"sales_person": "jack",
			"customer": "Joe",
			"sales_price": 100
		}
