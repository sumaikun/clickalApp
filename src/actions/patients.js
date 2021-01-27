import {
    SET_PATIENTS,
    ADD_PATIENT,
    REMOVE_PATIENT,
    SELECT_PATIENT
  } from "../constants";
  import api from "middleware/api";
  import { Patient } from "models/Patient";  
  
  function setPatients(patients) {
    return {
      type: SET_PATIENTS,   
      patients
    };
  }

  function addPatient(patient) {
    return {
      type: ADD_PATIENT,   
      patient
    };
  }

  function removePatient(patient) {
    return {
      type: REMOVE_PATIENT,   
      patient
    };
  }

  function selectPatient(patient){
    return{
      type: SELECT_PATIENT,   
      patient
    }
  }
  
  
  export function getPatients(cb=null) {
    
    
    return dispatch => {
      return api.getData("patients")
        .then(( response ) => {

          dispatch(setPatients(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function savePatient(patient,cb = null) {
  
    return dispatch => {
      
      if(patient._id){
        return api.putData("patients/"+patient._id,patient)
        .then(( response ) => {

          //dispatch(addPatient(patient));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData("patients",patient)
        .then(( response ) => {

          //dispatch(addPatient(patient));

          dispatch(selectPatient(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deletePatient(patient) {
  
    return dispatch => {
      return api.deleteData("patients/"+patient.id)
        .then(( response ) => {

          dispatch(removePatient(patient));          
        
        })
        .catch(err => { console.log("Error: ", err)
           
        });
    }
  }

  export function getPatient(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData("patients/"+id)
        .then(( response ) => {

          console.log("response.data",response.data)

          dispatch(selectPatient(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectPatient(
          new Patient()
        ));
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  