import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {toggleAddForm} from './store/actions';

import PersonList from "./components/PersonList/PersonList";
import PersonForm from "./components/Form/Form";
import { Button } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
        <div className="container ui">
          <h1>Address Book</h1>
          <PersonList />
          <Button style={{marginTop: "1em"}} color="teal" onClick={() => this.props.onToggleAddForm()}>
            Add Person
          </Button>
          <PersonForm onCancel={this.toggleForm} />  
        </div>
    );
  }
}
App.propTypes = {
  onToggleAddForm: PropTypes.func.isRequired
}
const mapDispachToProps = dispatch => ({
  onToggleAddForm: () => dispatch(toggleAddForm())
})
export default connect(null, mapDispachToProps)(App);
