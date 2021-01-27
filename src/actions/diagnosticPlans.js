import {
    SET_DIAGNOSTIC_PLANS,
    ADD_DIAGNOSTIC_PLAN,
    REMOVE_DIAGNOSTIC_PLAN,
    SELECT_DIAGNOSTIC_PLAN
  } from "../constants";
  import api from "middleware/api";
  import { DiagnosticPlan } from "models/diagnosticPlan";
  
  function setDiagnosticPlans(diagnosticPlans) {
    return {
      type: SET_DIAGNOSTIC_PLANS,   
      diagnosticPlans
    };
  }

  function addDiagnosticPlan(diagnosticPlan) {
    return {
      type: ADD_DIAGNOSTIC_PLAN,   
      diagnosticPlan
    };
  }

  function removeDiagnosticPlan(diagnosticPlan) {
    return {
      type: REMOVE_DIAGNOSTIC_PLAN,   
      diagnosticPlan
    };
  }

  function selectDiagnosticPlan(diagnosticPlan){
    return{
      type: SELECT_DIAGNOSTIC_PLAN,   
      diagnosticPlan
    }
  }

  const modelPoint = "diagnosticPlans"
  
  
  export function getDiagnosticPlansByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setDiagnosticPlans(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveDiagnosticPlan(diagnosticPlan,cb = null) {  

    return dispatch => {
      
      if(diagnosticPlan._id){
        return api.putData(modelPoint+"/"+diagnosticPlan._id,diagnosticPlan)
        .then(( response ) => {

          //dispatch(addDiagnosticPlan(diagnosticPlan));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,diagnosticPlan)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addDiagnosticPlan(diagnosticPlan));

          dispatch(selectDiagnosticPlan(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteDiagnosticPlan(diagnosticPlan,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+diagnosticPlan._id)
        .then(( response ) => {

          dispatch(removeDiagnosticPlan(diagnosticPlan));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getDiagnosticPlan(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectDiagnosticPlan(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectDiagnosticPlan(
            new DiagnosticPlan()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  