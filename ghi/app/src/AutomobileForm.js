import React from "react";

class AutomobileForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "color": '',
            "year": '',
            "vin": '',
            "models":[]
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

handleColorChange(event) {
    const value = event.target.value
    this.setState({color:value})
}

handleYearChange(event) {
    const value = event.target.value
    this.setState({year:value})
}

handleVinChange(event) {
    const value = event.target.value
    this.setState({vin:value})
}

handleModelChange(event) {
    const value = event.target.value
    this.setState({model_id:value})
}

async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    console.log("AUTOSUBMITTED DATA:",data)
    delete data.models

    const autosUrl = 'http://localhost:8100/api/automobiles/'
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json'
        }
    };

    const response = await fetch(autosUrl,fetchConfig)
    if(response.ok) {
        const newAuto = await response.json()
        console.log("NEW AUTO:", newAuto)

        const cleared = {
            "color": '',
            "year": '',
            "vin": '',
            "model_id": '',
        }
        this.setState(cleared)
    }
}

    async componentDidMount() {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url)

        if(response.ok) {
            const data = await response.json();
            this.setState({models:data.models})
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create an Automobile</h1>
                <form onSubmit={this.handleSubmit}id="create-shoe-form">
                <div className="form-floating mb-3">
                    <input placeholder="Color" required type="text" name="color" id="color" className="form-control" onChange={this.handleColorChange} value = {this.state.color}/>
                    <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="Year" required type="text" name="year" id="year" className="form-control" onChange={this.handleYearChange} value = {this.state.year}/>
                    <label htmlFor="year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" onChange={this.handleVinChange} value = {this.state.vin}/>
                    <label htmlFor="vin">Vin</label>
                    </div>
                    <div className="mb-3">
                    <select required name="model_id" id="model_id" className="form-select" onChange={this.handleModelChange} value={this.state.model_id}>
                        <option value="">Choose a Model</option>
                        {this.state.models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                {model.name}
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

export default AutomobileForm
