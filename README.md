# CarCar

Team:

* Sophie Nguyen - Service microservice
* Person 2 - Which microservice?

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
