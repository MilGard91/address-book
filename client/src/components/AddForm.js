import React, { Component } from "react";
import {Form, Button, Card} from 'semantic-ui-react';

class AddForm extends Component {
  state = {
    name: "",
    surname: "",
    city: "",
    address: "",
    phone: ""
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {name, surname, city, address, phone} = this.state;

    return (
      <div className="text ui raised segment teal">
        <Form>
          <h2>Add Person</h2>
          <Form.Field>
            <label>Name</label>
            <input 
              placeholder="Name"
              value={name}
              name="name"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Surname</label>
            <input placeholder="Surname"
              value = {surname}
              name="surname"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input placeholder="City"
              value={city}
              name="city"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input placeholder="Address"
              value={address}
              name = "address"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input placeholder="Phone"
              value={phone}
              name = "phone"
              onChange={this.onChange}
            />
          </Form.Field>
          <Button color= "red">Cancel</Button>
          <Button type="submit" color= "teal">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default AddForm;
