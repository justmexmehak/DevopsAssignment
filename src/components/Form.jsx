import React, { Component } from "react";
import './styles/Form.css';
class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            gender: "male",
            email: '',
            age: 18,
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`${this.state.name} ${this.state.address} ${this.state.gender}`)
        event.preventDefault()
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required minLength="3" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Age</label>
                    <input type="number" name="age" value={this.state.age} onChange={this.handleChange} required min="18" />
                </div>
                <div>
                    <label>Gender</label>
                    <select name="gender" value={this.state.gender} onChange = {this.handleChange} required >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Address</label>
                    <textarea name="address" value={this.state.address} onChange={this.handleChange} required minLength="10" ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Form