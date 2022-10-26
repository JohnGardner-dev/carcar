import React from 'react';


class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        console.log(data)
        data["phone_number"] = data["phoneNumber"]
        delete data.phoneNumber

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(customerUrl, fetchConfig);
        console.log(response);

        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            const cleared = {
                name: '',
                address: '',
                phoneNumber: '',
            }
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({ address: value })
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value;
        this.setState({ phoneNumber: value })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <h1>Create a Customer</h1>
                    <form onSubmit={this.handleSubmit} id='create-customer-form'>
                        <div className='form-floating mb-3'>
                            <input onChange={this.handleNameChange} value={this.state.name} type='text' className='form-control' placeholder='name' required name='name' />
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={this.handleAddressChange} value={this.state.address} type='text' className='form-control' placeholder='Address' required name='address' />
                            <label htmlFor='address'>Address</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={this.handlePhoneNumberChange} value={this.state.phoneNumber} type='text' className='form-control' placeholder='Phone Number' required name='phoneNumber' />
                            <label htmlFor='phoneNumber'>Phone Number</label>
                        </div>
                        <button className="btn btn-primary btn-lg">Create</button>
                    </form>
                </div>
            </>
        )
    }
}

export default AddCustomer;