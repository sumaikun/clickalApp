import {
    SET_DETECTED_DISEASES,
    ADD_DETECTED_DISEASE,
    REMOVE_DETECTED_DISEASE,
    SELECT_DETECTED_DISEASE
  } from "../constants";
  
  import { DetectedDisease } from "models/DetectedDisease";

  let index
  
  export function detectedDiseases(
    state = {
      detectedDiseases:[],     
      selectedDetectedDisease: new DetectedDisease()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_DETECTED_DISEASES:
        
        return Object.assign({}, state, {
          detectedDiseases:action.detectedDiseases,         
        });
  
      case SELECT_DETECTED_DISEASE:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedDetectedDisease:action.detectedDisease,         
        });
  
      case ADD_DETECTED_DISEASE:
        
        index = state.detectedDiseases.findIndex(  data => data.id === action.detectedDisease.id  );
  
        index ? state.detectedDiseases[index] = action.detectedDisease : state.detectedDiseases.push(action.detectedDisease);
        
        return state;
  
      case REMOVE_DETECTED_DISEASE:
  
        index = state.detectedDiseases.findIndex(  data => data.id === action.detectedDisease.id  );
  
        state.detectedDiseases.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }