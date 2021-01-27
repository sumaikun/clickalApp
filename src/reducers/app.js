import {
    SET_FETCHING,
    SET_CURRENT_PATIENT
  } from "../constants";

  export function app(
    state = {
      loading:false,
      currentPatient:null
    },
    action
  ) {
    switch (action.type) {

      case SET_FETCHING:
        return Object.assign({}, state, {
          loading:action.payload
      });

      /*case SET_BREEDS:
        return Object.assign({}, state, {
          breeds:action.payload
      });*/


      case SET_CURRENT_PATIENT:
        return Object.assign({}, state, {
          currentPatient:action.payload
      });
              
      default:
        return state;


    }
  }