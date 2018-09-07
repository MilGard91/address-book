import React, { Component } from "react";
import { connect } from "react-redux";
import {toggleAddForm} from './store/actions';

import PersonList from "./components/PersonList/PersonList";
import Form from "./components/Form/Form";
import { Button } from "semantic-ui-react";
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="container ui">
          <h1>Address Book</h1>
          <PersonList />
          <Button style={{marginTop: "1em"}} color="teal" onClick={() => this.props.onToggleAddForm()}>
            Add Person
          </Button>
          <Form onCancel={this.toggleForm} />  
        </div>
    );
  }
}


const mapDispachToProps = dispatch => ({
  onToggleAddForm: () => dispatch(toggleAddForm())
})
export default connect(null, mapDispachToProps)(App);
