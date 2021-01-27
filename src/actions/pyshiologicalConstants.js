import {
    SET_PHYSIOLOGICAL_CONSTANTS,
    ADD_PHYSIOLOGICAL_CONSTANT,
    REMOVE_PHYSIOLOGICAL_CONSTANT,
    SELECT_PHYSIOLOGICAL_CONSTANT
  } from "../constants";
  import api from "middleware/api";
  import { PhysiologicalConstant } from "models/physiologicalConstant";
  
  function setPhysiologicalConstant(physiologicalConstants) {
    return {
      type: SET_PHYSIOLOGICAL_CONSTANTS,   
      physiologicalConstants
    };
  }

  function addPhysiologicalConstant(physiologicalConstant) {
    return {
      type: ADD_PHYSIOLOGICAL_CONSTANT,   
      physiologicalConstant
    };
  }

  function removePhysiologicalConstant(physiologicalConstant) {
    return {
      type: REMOVE_PHYSIOLOGICAL_CONSTANT,   
      physiologicalConstant
    };
  }

  function selectPhysiologicalConstant(physiologicalConstant){
    return{
      type: SELECT_PHYSIOLOGICAL_CONSTANT,   
      physiologicalConstant
    }
  }
  
  const modelPoint = "physiologicalConstants"
  
  export function getPhysiologicalConstants(cb=null) {
    
    
    return dispatch => {
      return api.getData(modelPoint)
        .then(( response ) => {

          dispatch(setPhysiologicalConstant(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }

  export function getPhysiologicalConstantsByPatient(patient,cb=null) {
    
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setPhysiologicalConstant(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }

  

  export function savePhysiologicalConstant(physiologicalConstant,cb = null) {
  
    return dispatch => {
      
      if(physiologicalConstant._id){
        return api.putData(modelPoint+"/"+physiologicalConstant._id,physiologicalConstant)
        .then(( response ) => {

          //dispatch(addPhysiologicalConstant(physiologicalConstant));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,physiologicalConstant)
        .then(( response ) => {

          //dispatch(addPhysiologicalConstant(physiologicalConstant));

          dispatch(selectPhysiologicalConstant(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deletePhysiologicalConstant(physiologicalConstant,cb) {
  
    return dispatch => {
      return api.deleteData(modelPoint+"/"+physiologicalConstant._id)
        .then(( response ) => {

          dispatch(removePhysiologicalConstant(physiologicalConstant));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getPhysiologicalConstant(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectPhysiologicalConstant(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectPhysiologicalConstant(
            new PhysiologicalConstant()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  