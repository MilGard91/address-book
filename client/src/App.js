import React, { Component } from 'react';
import './App.css';
import PersonList from './components/PersonList';
import AddForm from './components/AddForm';
import {Button} from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="container ui">
      <h1>Address Book</h1>
       <PersonList /> 
       <Button color = "teal">
         Add Person
       </Button>
       <AddForm />
      </div>
    );
  }
}

export default App;
