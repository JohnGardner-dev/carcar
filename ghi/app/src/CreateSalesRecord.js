import React from 'react';


class CreateSalesRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            automobiles: [],
            automobile: '',
            salesPersons: [],
            salesPerson: '',
            customers: [],
            customer: '',
            salesPrice: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPriceChange = this.handleSalesPriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.automobiles
        delete data.salesPersons
        delete data.customers
        // changes "automobile" back from just the VIN to the "imported_href" value
        data["automobile"] = `/api/automobiles/${data["automobile"]}/`
        // changes shape of salesPerson back to sales_person
        data["sales_person"] = data["salesPerson"]
        delete data.salesPerson
        // changes shape of salesPrice back to sales_price
        data["sales_price"] = parseInt(data["salesPrice"])
        delete data.salesPrice

        console.log(data)

        const recordsUrl = 'http://localhost:8090/api/records/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(recordsUrl, fetchConfig)
        console.log(response)

        if (response.ok) {
            const newRecord = await response.json();
            console.log(newRecord)
            const cleared = {
                // automobiles: [],
                automobile: '',
                // salesPersons: [],
                salesPerson: '',
                // customers: [],
                customer: '',
                salesPrice: '',
            }

            this.setState(cleared);
        }
    }

    async componentDidMount() {
        // get list of available AutombileVOs to sell
        const automobilesUrl = "http://localhost:8090/api/inventory/";
        const automobilesResponse = await fetch(automobilesUrl);

        if (automobilesResponse.ok) {
            const data = await automobilesResponse.json();
            let automobiles = []
            for (let auto of data) {
                if (auto["sold"] == false) {
                    automobiles.push(auto)
                }
            }
            this.setState({ automobiles: automobiles })
        }
        // get list of current SalesPersons
        const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
        const salesPersonsResponse = await fetch(salesPersonsUrl);

        if (salesPersonsResponse.ok) {
            const data = await salesPersonsResponse.json();
            let salesPersons = []
            for (let person of data) {
                salesPersons.push(person)
            }
            this.setState({ salesPersons: salesPersons })
        }
        // get list of customers
        const customersUrl = "http://localhost:8090/api/customers/";
        const customersResponse = await fetch(customersUrl);

        if (customersResponse.ok) {
            const data = await customersResponse.json();
            let customers = []
            for (let customer of data) {
                customers.push(customer)
            }
            this.setState({ customers: customers })
        }
    }


    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesPerson: value })
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
    }

    handleSalesPriceChange(event) {
        const value = event.target.value;
        this.setState({ salesPrice: value })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <h1>Create A Sales Record</h1>
                    <form onSubmit={this.handleSubmit} id="create-sales-record-form">
                        <div className='mb-3'>
                            <select onChange={this.handleAutomobileChange} value={this.state.automobile} required id='automobile' name='automobile' className='form-select'>
                                <option value=''>Choose an Automobile</option>
                                {this.state.automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>({automobile.vin}) -- {automobile.year} {automobile.manufacturer} {automobile.model}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required id='salesPerson' name='salesPerson' className='form-select'>
                                <option value=''>Choose a Sales Person</option>
                                {this.state.salesPersons.map(salesPerson => {
                                    return (
                                        <option key={salesPerson.name} value={salesPerson.name}>({salesPerson.name}) -- {salesPerson.employee_id}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select onChange={this.handleCustomerChange} value={this.state.customer} required id='salesPerson' name='salesPerson' className='form-select'>
                                <option value=''>Choose a Customer</option>
                                {this.state.customers.map(customer => {
                                    return (
                                        <option key={customer.name} value={customer.name}>{customer.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='input-group mb-3'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>$</span>
                            </div>
                            <input onChange={this.handleSalesPriceChange} value={this.state.salesPrice} type="text" className='form-control' aria-label='Amount (to the nearest dollar)' />
                            <div className='input-group-append'>
                                <span className='input-group-text'>.00</span>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg">Create</button>
                    </form>
                </div>
            </>
        )
    }
}

export default CreateSalesRecord;