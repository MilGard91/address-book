import axios from 'axios';
import * as actionTypes from './types';

export const fetchPersons = () => dispatch => {
  axios
    .get('/person')
      .then(response => dispatch(setPersonData(response.data)))
      .catch(err => console.log(err))
}

export const setPersonData = (data) =>({
  type: actionTypes.SET_PERSON_DATA,
  data,
})

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
export const editPersonStart = (personData) => ({
  type: actionTypes.EDIT_PERSON_START,
  personData,
});

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

export const sortTable = sortColumn => ({
  type: actionTypes.SORT_TABLE,
  sortColumn,
})

export const toggleAddForm = () => ({
  type: actionTypes.TOGGLE_ADD_FORM
})

export const closeUpdateForm = () => ({
  type: actionTypes.CLOSE_UPDATE_FORM
})