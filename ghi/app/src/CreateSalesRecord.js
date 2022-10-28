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
        this.handleClick = this.handleClick.bind(this);
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

        const recordsUrl = 'http://localhost:8090/api/records/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(recordsUrl, fetchConfig)

        if (response.ok) {
            const newRecord = await response.json();
            const results = []
            const copy = this.state.automobiles
            for (let car of copy) {
                if (car.vin !== this.state.automobile) {
                    results.push(car)
                }
            }
            this.setState({ automobiles: results })
            if (newRecord["message"] !== "Car has already been sold") {
                const cleared = {
                    automobile: '',
                    salesPerson: '',
                    customer: '',
                    salesPrice: '',
                }

                this.setState(cleared);
                const preElement = document.getElementById("pre-form");
                preElement.classList.add("d-none")

                const postElement = document.getElementById("post-form");
                postElement.classList.remove("d-none")
            } else {
                const preElement = document.getElementById("pre-form");
                preElement.classList.add("d-none")
                const alreadySold = document.getElementById("already-sold");
                alreadySold.classList.remove("d-none")
            }
        }
    }

    async componentDidMount() {
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

    handleClick(event) {
        const cleared = {
            name: '',
            address: '',
            phoneNumber: '',
        }
        this.setState(cleared)
        const preElement = document.getElementById("pre-form");
        preElement.classList.remove("d-none")

        const postElement = document.getElementById("post-form");
        postElement.classList.add("d-none")
    }

    render() {
        return (
            <>
                <div className='container' id='pre-form'>
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
                                        <option key={salesPerson.id} value={salesPerson.name}>({salesPerson.name}) -- {salesPerson.employee_id}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select onChange={this.handleCustomerChange} value={this.state.customer} required id='salesPerson' name='salesPerson' className='form-select'>
                                <option value=''>Choose a Customer</option>
                                {this.state.customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.name}>{customer.name}</option>
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
                <div className='col text-center d-none' id='post-form' >
                    <img src='https://i.etsystatic.com/8806157/r/il/c08af8/1183447726/il_570xN.1183447726_sneo.jpg' width="500" height="500" className="rounded mx-auto d-block" />
                    <button onClick={this.handleClick} className="btn btn-primary btn-lg" id='post-form'>Add Another?</button>
                </div>
                <div className='col text-center d-none' id='already-sold'>
                    <h1>That Car Has Already Been Sold</h1>
                </div>
            </>
        )
    }
}

export default CreateSalesRecord;