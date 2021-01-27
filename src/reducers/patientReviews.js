import {
    SET_PATIENT_REVIEWS,
    ADD_PATIENT_REVIEW,
    REMOVE_PATIENT_REVIEW,
    SELECT_PATIENT_REVIEW
  } from "../constants";
  
  import { PatientReview } from "models/patientReview";

  let index
  
  export function patientReviews(
    state = {
      patientReviews:[],     
      selectedPatientReview: new PatientReview()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_PATIENT_REVIEWS:
        
        return Object.assign({}, state, {
          patientReviews:action.patientReviews,         
        });
  
      case SELECT_PATIENT_REVIEW:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedPatientReview:action.patientReview,         
        });
  
      case ADD_PATIENT_REVIEW:
        
        index = state.patientReviews.findIndex(  data => data.id === action.patientReview.id  );
  
        index ? state.patientReviews[index] = action.patientReview : state.patientReviews.push(action.patientReview);
        
        return state;
  
      case REMOVE_PATIENT_REVIEW:
  
        index = state.patientReviews.findIndex(  data => data.id === action.patientReview.id  );
  
        state.patientReviews.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }