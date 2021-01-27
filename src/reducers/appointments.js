import {
    SET_APPOINTMENTS,
    ADD_APPOINTMENT,
    REMOVE_APPOINTMENT,
    SELECT_APPOINTMENT
  } from "../constants";
  
  import { Appointment } from "models/Appointment";

  let index
  
  export function appointments(
    state = {
      appointments:[],     
      selectedAppointment: new Appointment()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_APPOINTMENTS:
        
        return Object.assign({}, state, {
          appointments:action.appointments,         
        });
  
      case SELECT_APPOINTMENT:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedAppointment:action.appointment,         
        });
  
      case ADD_APPOINTMENT:
        
        index = state.appointments.findIndex(  data => data.id === action.appointment.id  );
  
        index ? state.appointments[index] = action.appointment : state.appointments.push(action.appointment);
        
        return state;
  
      case REMOVE_APPOINTMENT:
  
        index = state.appointments.findIndex(  data => data.id === action.appointment.id  );
  
        state.appointments.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }