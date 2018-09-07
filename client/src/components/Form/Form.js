import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions";

import { Form, Button, Modal } from "semantic-ui-react";
import "./Form.css";

// FUNCTION FOR CAPITALIZATION OF STRINGS
function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}
const initialState = {
  name: "",
  surname: "",
  city: "",
  address: "",
  phone: "",
  _id: ""
}

class PersonForm extends Component {
  state = {
    ...initialState
  };
  componentWillReceiveProps(nextProps) {
    //ADDING DATA OF PERSON FOR EDIT
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
  // BINDING STATE AND INPUT
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // CLOSE FORM
  onClick = () => {
    //SETTING BACK INITIAL STATE
    this.setState({
      ...initialState
    });
    if (this.props.showAddForm) {
      this.props.onToggleAddForm();
    }
    if (this.props.showUpdateForm) {
      this.props.onCloseUpdateForm();
    }
  };
  //SUBMIT FORM
  onSubmit = e => {
    e.preventDefault();
    // DATA FOR NEW PERSON
    const newPersonData = {
      name: capitalize(this.state.name),
      surname: capitalize(this.state.surname),
      city: capitalize(this.state.city),
      address: capitalize(this.state.address),
      phone: this.state.phone
    };
    //DATA FOR EDIT PERSON
    const editPersonData = {
      name: capitalize(this.state.name),
      surname: capitalize(this.state.surname),
      city: capitalize(this.state.city),
      address: capitalize(this.state.address),
      phone: capitalize(this.state.phone),
      _id: this.state._id
    };
    // ADDING PERSON
    if (this.props.showAddForm) {
      this.props.onAddPerson(newPersonData);
    }
    // EDITING PERSON
    if (this.props.showUpdateForm) {
      this.props.onEditPerson(editPersonData);
    }

    //SETING BACK INITIAL STATE
    this.setState({
      ...initialState
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
                className="FormInput"
                placeholder="Name"
                value={name}
                name="name"
                onChange={this.onChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Surname</label>
              <input
                className="FormInput"
                placeholder="Surname"
                value={surname}
                name="surname"
                onChange={this.onChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                className="FormInput"
                placeholder="City"
                value={city}
                name="city"
                onChange={this.onChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                className="FormInput"
                placeholder="Address"
                value={address}
                name="address"
                onChange={this.onChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input
                placeholder="Phone"
                value={phone}
                name="phone"
                onChange={this.onChange}
                required
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
// PROPTYPES
PersonForm.propTypes = {
  onAddPerson: PropTypes.func.isRequired,
  onEditPerson: PropTypes.func.isRequired,
  onToggleAddForm: PropTypes.func.isRequired,
  onCloseUpdateForm: PropTypes.func.isRequired,
  showUpdateForm: PropTypes.bool,
  showAddForm: PropTypes.bool,
  editPerson: PropTypes.object
}
//MAPING REDUX STATE TO PROPS
const mapStateToProps = state => ({
  showUpdateForm: state.showUpdateForm,
  showAddForm: state.showAddForm,
  editPerson: state.editPerson
});
//MAPING DISPATCH TO PROPS
const mapDispatchToProps = dispatch => ({
  onAddPerson: newPersonData => dispatch(actions.addPerson(newPersonData)),
  onEditPerson: editPersonData => dispatch(actions.editPerson(editPersonData)),
  onToggleAddForm: () => dispatch(actions.toggleAddForm()),
  onCloseUpdateForm: () => dispatch(actions.closeUpdateForm())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonForm);
