import {
    SET_THERAPEUTIC_PLANS,
    ADD_THERAPEUTIC_PLAN,
    REMOVE_THERAPEUTIC_PLAN,
    SELECT_THERAPEUTIC_PLAN
  } from "../constants";
  import api from "middleware/api";
  import { TherapeuticPlan } from "models/therapeuticPlan";
  
  function setTherapeuticPlans(therapeuticPlans) {
    return {
      type: SET_THERAPEUTIC_PLANS,   
      therapeuticPlans
    };
  }

  function addTherapeuticPlan(therapeuticPlan) {
    return {
      type: ADD_THERAPEUTIC_PLAN,   
      therapeuticPlan
    };
  }

  function removeTherapeuticPlan(therapeuticPlan) {
    return {
      type: REMOVE_THERAPEUTIC_PLAN,   
      therapeuticPlan
    };
  }

  function selectTherapeuticPlan(therapeuticPlan){
    return{
      type: SELECT_THERAPEUTIC_PLAN,   
      therapeuticPlan
    }
  }

  const modelPoint = "therapeuticPlans"
  
  
  export function getTherapeuticPlansByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setTherapeuticPlans(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveTherapeuticPlan(therapeuticPlan,cb = null) {  

    return dispatch => {
      
      if(therapeuticPlan._id){
        return api.putData(modelPoint+"/"+therapeuticPlan._id,therapeuticPlan)
        .then(( response ) => {

          //dispatch(addTherapeuticPlan(therapeuticPlan));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,therapeuticPlan)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addTherapeuticPlan(therapeuticPlan));

          dispatch(selectTherapeuticPlan(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteTherapeuticPlan(therapeuticPlan,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+therapeuticPlan._id)
        .then(( response ) => {

          dispatch(removeTherapeuticPlan(therapeuticPlan));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getTherapeuticPlan(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectTherapeuticPlan(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectTherapeuticPlan(
            new TherapeuticPlan()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  