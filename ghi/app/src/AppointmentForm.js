import React from "react";

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin:'',
            owner: '',
            date: '',
            time: '',
            reason: '',
            technicians: []
        }
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleOwnerChange = this.handleOwnerChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state};
        delete data.technicians

        const appointmentUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        };

        const response = await fetch(appointmentUrl,fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();

            const cleared = {
                vin:'',
                owner: '',
                date: '',
                time: '',
                reason: '',
                technician: '',
            };
            this.setState(cleared)
        }
    }
    handleVinChange(event) {
        const value = event.target.value
        this.setState({ vin: value })
    }

    handleOwnerChange(event) {
        const value = event.target.value
        this.setState({ owner: value })
    }

    handleDateChange(event) {
        const value = event.target.value
        this.setState({ date: value })
    }

    handleTimeChange(event) {
        const value = event.target.value
        this.setState({ time: value })
    }

    handleReasonChange(event) {
        const value = event.target.value
        this.setState({ reason: value })
    }

    handleTechnicianChange(event) {
        const value = event.target.value
        this.setState({ technician: value })
    }

    async componentDidMount () {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url)
        console.log("====TECHNICIAN REPONSE===", response)

        if (response.ok) {
            const data = await response.json();
            console.log("===TECHNICIAN DATA===",data)
            this.setState({technicians: data.technicians})
        }
    }

    render() {
        return(
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new Appointment</h1>
                <form onSubmit={this.handleSubmit} id="create-appointment-form">
                    <div className="form-floating mb-3">
                    <input placeholder="vin" required type="text" name="vin" id="vin" className="form-control" onChange={this.handleVinChange} value={this.state.vin} />
                    <label htmlFor="vin">Vin</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="owner" required type="text" name="owner" id="owner" className="form-control" onChange={this.handleOwnerChange} value = {this.state.owner}/>
                    <label htmlFor="owner">Car Owner</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="date" required type="date" name="date" id="date" className="form-control" onChange={this.handleDateChange} value={this.state.date}/>
                    <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="time" required type="time" name="time" id="time" className="form-control" onChange={this.handleTimeChange} value={this.state.time}/>
                    <label htmlFor="time">Time</label>
                    </div>
                    <div className="form-floating mb-3">
                    <textarea placeholder="reason" required type="text" name="reason" id="reason" className="form-control" onChange={this.handleReasonChange} value={this.state.reason}></textarea>
                    <label htmlFor="reason">Reason</label>
                    </div>
                    <div className="mb-3">
                    <select required name="bin" id="bin" className="form-select" onChange={this.handleTechnicianChange} value={this.state.technician}>
                        <option value="">Choose a Technician</option>
                        {this.state.technicians.map(technician => {
                            return (
                                <option key={technician.number} value={technician.number}>
                                {technician.name}
                                </option>
                            )
                        })}
                    </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        )
    }
}

export default AppointmentForm
