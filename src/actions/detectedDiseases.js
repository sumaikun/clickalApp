import {
    SET_DETECTED_DISEASES,
    ADD_DETECTED_DISEASE,
    REMOVE_DETECTED_DISEASE,
    SELECT_DETECTED_DISEASE
  } from "../constants";
  import api from "middleware/api";
  import { DetectedDisease } from "models/DetectedDisease";
  
  function setDetectedDiseases(detectedDiseases) {
    return {
      type: SET_DETECTED_DISEASES,   
      detectedDiseases
    };
  }

  function addDetectedDisease(detectedDisease) {
    return {
      type: ADD_DETECTED_DISEASE,   
      detectedDisease
    };
  }

  function removeDetectedDisease(detectedDisease) {
    return {
      type: REMOVE_DETECTED_DISEASE,   
      detectedDisease
    };
  }

  function selectDetectedDisease(detectedDisease){
    return{
      type: SELECT_DETECTED_DISEASE,   
      detectedDisease
    }
  }

  const modelPoint = "detectedDiseases"
  
  
  export function getDetectedDiseasesByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setDetectedDiseases(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveDetectedDisease(detectedDisease,cb = null) {  

    return dispatch => {
      
      if(detectedDisease._id){
        return api.putData(modelPoint+"/"+detectedDisease._id,detectedDisease)
        .then(( response ) => {

          //dispatch(addDetectedDisease(detectedDisease));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,detectedDisease)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addDetectedDisease(detectedDisease));

          dispatch(selectDetectedDisease(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteDetectedDisease(detectedDisease,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+detectedDisease._id)
        .then(( response ) => {

          dispatch(removeDetectedDisease(detectedDisease));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getDetectedDisease(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectDetectedDisease(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectDetectedDisease(
            new DetectedDisease()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  