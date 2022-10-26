import React from 'react';


class ListSalesHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesPersons: [],
            salesPerson: '',
            salesRecords: [],
            allSalesRecords: [],
        };
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesPerson: value })

        let resultRecords = []
        for (let record of this.state.allSalesRecords) {
            if (record["sales_person"]["name"] == value) {
                resultRecords.push(record)
            }
        }
        this.setState({ salesRecords: resultRecords })
    }

    async componentDidMount() {
        // get list of Sales Records
        const salesRecordsUrl = 'http://localhost:8090/api/records/'
        const salesRecordsResponse = await fetch(salesRecordsUrl)

        if (salesRecordsResponse.ok) {
            const data = await salesRecordsResponse.json();
            const allSalesRecords = data.sales
            this.setState({ allSalesRecords: allSalesRecords })
        }

        // get list of Sales Persons
        const salesPersonsUrl = 'http://localhost:8090/api/salespersons/'
        const salesPersonsResponse = await fetch(salesPersonsUrl)

        if (salesPersonsResponse.ok) {
            const data = await salesPersonsResponse.json();
            let salesPersons = []
            for (let salesPerson of data) {
                salesPersons.push(salesPerson)
            }
            this.setState({ salesPersons: salesPersons })
        }
    }

    render() {
        return (
            <>
                <div className='container'>
                    <h1>Sales Person History</h1>
                    <div className='mb-3'>
                        <select onChange={this.handleSalesPersonChange} value={this.state.salesPerson} required id='salesPerson' name='salesPerson' className='form-select'>
                            <option value=''>Choose a Sales Person</option>
                            {this.state.salesPersons.map(salesPerson => {
                                return (
                                    <option key={salesPerson.name} value={salesPerson.name}>{salesPerson.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sales Person</th>
                                    <th>Customer</th>
                                    <th>VIN</th>
                                    <th>Sales Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.salesRecords.map(record => {
                                    return (
                                        <tr>
                                            <td>{record["sales_person"]["name"]}</td>
                                            <td>{record["customer"]["name"]}</td>
                                            <td>{record["automobile"]["vin"]}</td>
                                            <td>{record["sales_price"]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default ListSalesHistory;