import React from 'react';


class AddSalesPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeID: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIDnumberChange = this.handleIDnumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data["employee_id"] = data["employeeID"]
        delete data.employeeID
        console.log(data)

        const salesPersonUrl = 'http://localhost:8090/api/salespersons/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(salesPersonUrl, fetchConfig);
        console.log(response);

        if (response.ok) {
            const newSalesPerson = await response.json();
            console.log(newSalesPerson);
            const cleared = {
                name: '',
                employeeID: '',
            }
            this.setState(cleared);
            const preElement = document.getElementById("pre-form");
            preElement.classList.add("d-none")

            const postElement = document.getElementById("post-form");
            postElement.classList.remove("d-none")
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleIDnumberChange(event) {
        const value = event.target.value;
        this.setState({ employeeID: value })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <h1>Create a Sales Person</h1>
                    <form onSubmit={this.handleSubmit} id='create-sales-person-form'>
                        <div className='form-floating mb-3'>
                            <input onChange={this.handleNameChange} value={this.state.name} type='text' className='form-control' placeholder='name' required name='name' />
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={this.handleIDnumberChange} value={this.state.employeeID} type='text' className='form-control' placeholder='ID number' required name='id' />
                            <label htmlFor='id'>ID Number</label>
                        </div>
                        <button className="btn btn-primary btn-lg" id='pre-form'>Create</button>
                        <h2 className='d-none' style={{ color: 'green' }} id="post-form">SUCCESS!</h2>
                    </form>
                </div>
            </>
        )
    }
}

export default AddSalesPerson;