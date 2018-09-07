import axios from 'axios';
import * as actionTypes from './types';

// FETCHING DATA FROM SERVER
export const fetchPersons = () => dispatch => {
  axios
    .get('/person')
      .then(response => dispatch(setPersonData(response.data)))
      .catch(err => console.log(err))
}

// ADDING DATA FROM SERVER TO REDUX
export const setPersonData = (data) =>({
  type: actionTypes.SET_PERSON_DATA,
  data,
})

// ADD NEW PERSON
export const addPerson = personData => dispatch => {
  axios
    .post('/person', personData)
    .then(res => dispatch(fetchPersons()))
    .catch(err => 
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
}

//DELETE PERSON
export const deletePerson = id => dispatch => {
  axios
    .delete(`/person/${id}`)
      .then (res => dispatch(fetchPersons()))
      .catch(err => 
        dispatch ({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        }));
}

// INITIATE EDIT PERSON
export const editPersonStart = (personData) => ({
  type: actionTypes.EDIT_PERSON_START,
  personData,
});

// EDIT PERSON
export const editPerson = (personData) => dispatch => {
  axios
    .patch(`/person/${personData._id}`, personData)
      .then(res => dispatch(fetchPersons()))
      .catch(err => 
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        }));
}

// SORTING TABLE
export const sortTable = sortColumn => ({
  type: actionTypes.SORT_TABLE,
  sortColumn,
})

// TOGGLE ADD FORM
export const toggleAddForm = () => ({
  type: actionTypes.TOGGLE_ADD_FORM
})

//CLOSE UPDATE FORM
export const closeUpdateForm = () => ({
  type: actionTypes.CLOSE_UPDATE_FORM
})

// CLEAR ERRORS
export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
})