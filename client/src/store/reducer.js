import * as actionTypes from "./types";
import _ from "lodash";

const initialState = {
  persons: [],
  errors: null,
  sortColumn: "",
  direction: null,
  loading: true,
  editPerson: null,
  showUpdateForm: false,
  showAddForm: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // SEEDING STATE WITH DATA FROM SERVER
    case actionTypes.SET_PERSON_DATA:
      return {
        ...state,
        persons: action.data,
        error: null,
        loading: false
      };
    // SORTING DATA IN STATE
    case actionTypes.SORT_TABLE:
      let sortedPersons = [...state.persons];
      let newDirection;
      if (action.sortColumn !== state.sortColumn) {
        sortedPersons = _.sortBy(sortedPersons, [action.sortColumn]);
        newDirection = "ascending";
      } else {
        sortedPersons = sortedPersons.reverse();
        newDirection =
          state.direction === "ascending" ? "descending" : "ascending";
      }
      return {
        ...state,
        persons: sortedPersons,
        direction: newDirection,
        sortColumn: action.sortColumn
      };
    //TOGGLE ADD FORM
    case actionTypes.TOGGLE_ADD_FORM:
      return {
        ...state,
        showAddForm: !state.showAddForm
      };
    // CLOSE UPDATE FORM
    case actionTypes.CLOSE_UPDATE_FORM:
      return {
        ...state,
        editPerson: null,
        showUpdateForm: !state.showUpdateForm
      };
    // INITIATE EDIT PERSON
    case actionTypes.EDIT_PERSON_START:
      return {
        ...state,
        editPerson: action.personData,
        showUpdateForm: true
      };
    default:
      return state;
  }
}
