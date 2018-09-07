import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Modal } from "semantic-ui-react";
import * as actions from "../../store/actions";
import "./Form.css";

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

class AddForm extends Component {
  state = {
    name: "",
    surname: "",
    city: "",
    address: "",
    phone: "",
    _id: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.editPerson) {
      this.setState({
        name: nextProps.editPerson.name,
        surname: nextProps.editPerson.surname,
        city: nextProps.editPerson.city,
        address: nextProps.editPerson.address,
        phone: nextProps.editPerson.phone,
        _id: nextProps.editPerson._id
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClick = () => {
    this.setState({
      name: "",
      surname: "",
      city: "",
      address: "",
      phone: "",
      _id: ""
    });
    if (this.props.showAddForm) {
      this.props.onToggleAddForm();
    }
    if (this.props.showUpdateForm) {
      this.props.onCloseUpdateForm();
    }
  };
  onSubmit = e => {
    e.preventDefault();

    const newPersonData = {
      name: capitalize(this.state.name),
      surname: capitalize(this.state.surname),
      city: capitalize(this.state.city),
      address: capitalize(this.state.address),
      phone: this.state.phone
    };
    const editPersonData = {
      name: capitalize(this.state.name),
      surname: capitalize(this.state.surname),
      city: capitalize(this.state.city),
      address: capitalize(this.state.address),
      phone: capitalize(this.state.phone),
      _id: this.state._id
    };
    if (this.props.showAddForm) {
      this.props.onAddPerson(newPersonData);
      this.props.onToggleAddForm();
    }
    if (this.props.showUpdateForm) {
      this.props.onEditPerson(editPersonData);
      this.props.onCloseUpdateForm();
    }

    this.setState({
      name: "",
      surname: "",
      city: "",
      address: "",
      phone: "",
      _id: ""
    });
  };

  render() {
    const { name, surname, city, address, phone } = this.state;
    const {showAddForm, showUpdateForm} = this.props;
    return (
      <Modal
        dimmer = "blurring"
        open={showAddForm || showUpdateForm}
      >
        <div className="text ui raised segment teal large ">
          <Form onSubmit={this.onSubmit}>
            <h2>Add Person</h2>
            <Form.Field>
              <label>Name</label>
              <input
                className="AddForm"
                placeholder="Name"
                value={name}
                name="name"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Surname</label>
              <input
                className="AddForm"
                placeholder="Surname"
                value={surname}
                name="surname"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                className="AddForm"
                placeholder="City"
                value={city}
                name="city"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                className="AddForm"
                placeholder="Address"
                value={address}
                name="address"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input
                placeholder="Phone"
                value={phone}
                name="phone"
                onChange={this.onChange}
              />
            </Form.Field>
            <Button type="submit" color="teal">
              Submit
            </Button>
            <Button type="button" color="red" onClick={this.onClick}>
              Cancel
            </Button>
          </Form>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  showUpdateForm: state.showUpdateForm,
  showAddForm: state.showAddForm,
  editPerson: state.editPerson
});
const mapDispatchToProps = dispatch => ({
  onAddPerson: newPersonData => dispatch(actions.addPerson(newPersonData)),
  onEditPerson: editPersonData => dispatch(actions.editPerson(editPersonData)),
  onToggleAddForm: () => dispatch(actions.toggleAddForm()),
  onCloseUpdateForm: () => dispatch(actions.closeUpdateForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddForm);
