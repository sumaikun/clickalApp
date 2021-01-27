import {
    SET_PATIENT_REVIEWS,
    ADD_PATIENT_REVIEW,
    REMOVE_PATIENT_REVIEW,
    SELECT_PATIENT_REVIEW
  } from "../constants";
  import api from "middleware/api";
  import { PatientReview } from "models/patientReview";
  
  function setPatientReviews(patientReviews) {
    return {
      type: SET_PATIENT_REVIEWS,   
      patientReviews
    };
  }

  function addPatientReview(patientReview) {
    return {
      type: ADD_PATIENT_REVIEW,   
      patientReview
    };
  }

  function removePatientReview(patientReview) {
    return {
      type: REMOVE_PATIENT_REVIEW,   
      patientReview
    };
  }

  function selectPatientReview(patientReview){
    return{
      type: SELECT_PATIENT_REVIEW,   
      patientReview
    }
  }

  const modelPoint = "patientReviews"
  
  
  export function getPatientReviewsByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setPatientReviews(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function savePatientReview(patientReview,cb = null) {  

    return dispatch => {
      
      if(patientReview._id){
        return api.putData(modelPoint+"/"+patientReview._id,patientReview)
        .then(( response ) => {

          //dispatch(addPatientReview(patientReview));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,patientReview)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addPatientReview(patientReview));

          dispatch(selectPatientReview(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deletePatientReview(patientReview,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+patientReview._id)
        .then(( response ) => {

          dispatch(removePatientReview(patientReview));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getPatientReview(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectPatientReview(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectPatientReview(
            new PatientReview()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  