import {
    SET_PATIENT_FILES,
    ADD_PATIENT_FILE,
    REMOVE_PATIENT_FILE,
    SELECT_PATIENT_FILE
  } from "../constants";
  import api from "middleware/api";
  import { PatientFile } from "models/PatientFile";
  
  function setPatientFiles(patientFiles) {
    return {
      type: SET_PATIENT_FILES,   
      patientFiles
    };
  }

  function addPatientFile(patientFile) {
    return {
      type: ADD_PATIENT_FILE,   
      patientFile
    };
  }

  function removePatientFile(patientFile) {
    return {
      type: REMOVE_PATIENT_FILE,   
      patientFile
    };
  }

  function selectPatientFile(patientFile){
    return{
      type: SELECT_PATIENT_FILE,   
      patientFile
    }
  }

  const modelPoint = "patientFiles"
  
  
  export function getPatientFilesByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setPatientFiles(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function savePatientFile(patientFile,cb = null) {  

    return dispatch => {
      
      if(patientFile._id){
        return api.putData(modelPoint+"/"+patientFile._id,patientFile)
        .then(( response ) => {

          //dispatch(addPatientFile(patientFile));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,patientFile)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addPatientFile(patientFile));

          dispatch(selectPatientFile(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deletePatientFile(patientFile,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+patientFile._id)
        .then(( response ) => {

          dispatch(removePatientFile(patientFile));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getPatientFile(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectPatientFile(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectPatientFile(
            new PatientFile()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  