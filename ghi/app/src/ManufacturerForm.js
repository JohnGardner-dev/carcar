import React from "react";

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state};

        const url = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url,fetchConfig)

        if(response.ok) {
            const newManufacturer = await response.json()

            const cleared = {
                name: '',
            }
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }


    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new Manufacturer</h1>
                <form onSubmit={this.handleSubmit}id="create-location-form">
                    <div className="form-floating mb-3">
                    <input placeholder="Name" required type="text" name="name" id="name" className="form-control" onChange={this.handleNameChange} value={this.state.name} />
                    <label htmlFor="name">Name</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
            </div>
        )
    }
}

export default ManufacturerForm
