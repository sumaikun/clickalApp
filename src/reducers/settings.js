import {
    SET_DOCTOR_CONFIG
  } from "../constants";
  
  let index
  
  export function settings(
    state = {
      doctorSetting:{}
    },
    action
  ) {
    switch (action.type) {
  
      case SET_DOCTOR_CONFIG:
        
        return Object.assign({}, state, {
            doctorSetting:action.payload,         
        });
  
  
      default:
        return state;
  
  
    }
  }