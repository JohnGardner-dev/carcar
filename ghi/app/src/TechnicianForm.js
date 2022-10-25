import React from "react";

class TechnicianForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            number: '',
        }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state};
        console.log("====DATA======", data)

        const technicianUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        }

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            console.log("===NEW TECHNICIAN===", newTechnician)

            const cleared = {
                name: '',
                number: ''
            };
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name:value})
    }

    handleNumberChange(event) {
        const value = event.target.value
        this.setState({number:value})
    }


    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Enter a technician</h1>
                <form onSubmit={this.handleSubmit}id="create-technician-form">
                    <div className="form-floating mb-3">
                    <input placeholder="Name" required type="text" name="name" id="name" className="form-control" onChange={this.handleNameChange} value={this.state.name} />
                    <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="Number" required type="text" name="number" id="number" className="form-control" onChange={this.handleNumberChange} value = {this.state.number}/>
                    <label htmlFor="number">Employee Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        )
    }
}

export default TechnicianForm
