import {
    SET_PATIENTS,
    ADD_PATIENT,
    REMOVE_PATIENT,
    SELECT_PATIENT
  } from "../constants";
  
  let index
  
  export function patients(
    state = {
      patients:[],     
      selectedPatient:{} 
    },
    action
  ) {
    switch (action.type) {
  
      case SET_PATIENTS:
        
        return Object.assign({}, state, {
          patients:action.patients,         
        });
  
      case SELECT_PATIENT:
  
        return Object.assign({}, state, {
          selectedPatient:action.patient,         
        });
  
      case ADD_PATIENT:
        
        index = state.patients.findIndex(  data => data.id === action.patient.id  );
  
        index ? state.patients[index] = action.patient : state.patients.push(action.patient);
        
        return state;
  
      case REMOVE_PATIENT:
  
        index = state.patients.findIndex(  data => data.id === action.patient.id  );
  
        state.patients.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }