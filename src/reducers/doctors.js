import {
  SET_DOCTORS,
  ADD_DOCTOR,
  REMOVE_DOCTOR,
  SELECT_DOCTOR
} from "../constants";

let index

export function doctors(
  state = {
    doctors:[],     
    selectedDoctor:{} 
  },
  action
) {
  switch (action.type) {

    case SET_DOCTORS:
      
      return Object.assign({}, state, {
        doctors:action.doctors,         
      });

    case SELECT_DOCTOR:

      return Object.assign({}, state, {
        selectedDoctor:action.doctor,         
      });

    case ADD_DOCTOR:
      
      index = state.doctors.findIndex(  data => data.id === action.doctor.id  );

      index ? state.doctors[index] = action.doctor : state.doctors.push(action.doctor);
      
      return state;

    case REMOVE_DOCTOR:

      index = state.doctors.findIndex(  data => data.id === action.doctor.id  );

      state.doctors.splice(index,1);

      return state;

    default:
      return state;


  }
}