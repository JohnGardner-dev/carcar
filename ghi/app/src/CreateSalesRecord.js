import React from 'react';


class CreateSalesRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            automobiles: [],
            automobile: '',
            sales_person: '',
            customer: '',
            sales_price: '',
        }
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
    }
    async componentDidMount() {
        const url = "http://localhost:8090/api/inventory/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            let results = []
            for (let auto of data) {
                if (auto["sold"] == false) {
                    results.push(auto)
                }
            }
            this.setState({ automobiles: results })
        }
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <h1>Create A Sales Record</h1>
                    <form id="create-sales-record-form">
                        <div className='mb-3'>
                            <select onChange={this.handleAutomobileChange} value={this.state.automobile} required id='automobile' name='automobile' className='form-select'>
                                <option value=''>Choose an automobile</option>
                                {this.state.automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>({automobile.vin}) -- {automobile.year} {automobile.manufacturer} {automobile.model}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default CreateSalesRecord;