import {
    SET_PATIENT_FILES,
    ADD_PATIENT_FILE,
    REMOVE_PATIENT_FILE,
    SELECT_PATIENT_FILE
  } from "../constants";
  
  import { PatientFile } from "models/PatientFile";

  let index
  
  export function patientFiles(
    state = {
      patientFiles:[],     
      selectedPatientFile: new PatientFile()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_PATIENT_FILES:
        
        return Object.assign({}, state, {
          patientFiles:action.patientFiles,         
        });
  
      case SELECT_PATIENT_FILE:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedPatientFile:action.patientFile,         
        });
  
      case ADD_PATIENT_FILE:
        
        index = state.patientFiles.findIndex(  data => data.id === action.patientFile.id  );
  
        index ? state.patientFiles[index] = action.patientFile : state.patientFiles.push(action.patientFile);
        
        return state;
  
      case REMOVE_PATIENT_FILE:
  
        index = state.patientFiles.findIndex(  data => data.id === action.patientFile.id  );
  
        state.patientFiles.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }