import React from "react";

class ModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture_url: '',
            manufacturer_id: '',
            manufacturers: [],

        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this)
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }

async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state};
    delete data.manufacturers;


    const modelUrl = 'http://localhost:8100/api/models/'
    const fetchConfig ={
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        },
    };

    const response = await fetch(modelUrl,fetchConfig);

    if (response.ok) {

        var preElement= document.getElementById("pre-form");
        preElement.classList.add("d-none")

        var postElement= document.getElementById("post-form");
        postElement.classList.remove("d-none")

    }
}

handleClick(event) {

    const cleared = {
        name: '',
        picture_url: '',
        manufacturer_id: '',
    }
    this.setState(cleared)
    var preElement= document.getElementById("pre-form");
    preElement.classList.remove("d-none")

    var postElement= document.getElementById("post-form");
    postElement.classList.add("d-none")
}

handleNameChange(event) {
    const value = event.target.value;
    this.setState({name:value})
}

handlePictureUrlChange(event) {
    const value = event.target.value;
    this.setState({picture_url:value})
}

handleManufacturerChange(event) {
    const value = event.target.value;
    this.setState({manufacturer_id:value})
}

async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json();
        this.setState({manufacturers:data.manufacturers})
    }
}

    render() {
        return (
            <div>
            <div className="row" id='pre-form'>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a Vehicle Model</h1>
                <form onSubmit={this.handleSubmit}id="create-shoe-form">
                    <div className="form-floating mb-3">
                    <input placeholder="Name" required type="text" name="name" id="name" className="form-control" onChange={this.handleNameChange} value={this.state.name} />
                    <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input placeholder="Picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" onChange={this.handlePictureUrlChange} value = {this.state.picture_url}/>
                    <label htmlFor="picture_url">Picture Url</label>
                    </div>
                    <div className="mb-3">
                    <select required name="manufacturer_id" id="manufacturer_id" className="form-select" onChange={this.handleManufacturerChange} value={this.state.manufacturer_id}>
                        <option value="">Choose a manufacturer</option>
                        {this.state.manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
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
            <div className='col text-center d-none ' id='post-form' >
                    <img src='https://i.etsystatic.com/8806157/r/il/c08af8/1183447726/il_570xN.1183447726_sneo.jpg' width="500" height="500" className="rounded mx-auto d-block"/>
                    <button onClick={this.handleClick} className="btn btn-primary btn-lg" id='post-form'>Add Another?</button>
                    </div>
            </div>
        )
    }
}

export default ModelForm
