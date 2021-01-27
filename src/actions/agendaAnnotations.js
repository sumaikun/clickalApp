import {
    SET_AGENDA_ANNOTATIONS,
    ADD_AGENDA_ANNOTATION,
    REMOVE_AGENDA_ANNOTATION,
    SELECT_AGENDA_ANNOTATION
  } from "../constants";
  import api from "middleware/api";
  import { AgendaAnnotation } from "models/AgendaAnnotation";
  
  function setAgendaAnnotations(AgendaAnnotations) {
    return {
      type: SET_AGENDA_ANNOTATIONS,   
      AgendaAnnotations
    };
  }

  function addAgendaAnnotation(AgendaAnnotation) {
    return {
      type: ADD_AGENDA_ANNOTATION,   
      AgendaAnnotation
    };
  }

  function removeAgendaAnnotation(AgendaAnnotation) {
    return {
      type: REMOVE_AGENDA_ANNOTATION,   
      AgendaAnnotation
    };
  }

  function selectAgendaAnnotation(AgendaAnnotation){
    return{
      type: SELECT_AGENDA_ANNOTATION,   
      AgendaAnnotation
    }
  }

  const modelPoint = "agendaAnnotations"
  
  
  export function getAgendaAnnotationsByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setAgendaAnnotations(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }

  export function getAgendaAnnotations(cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setAgendaAnnotations(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveAgendaAnnotation(AgendaAnnotation,cb = null) {  

    return dispatch => {
      
      if(AgendaAnnotation._id){
        return api.putData(modelPoint+"/"+AgendaAnnotation._id,AgendaAnnotation)
        .then(( response ) => {

          //dispatch(addAgendaAnnotation(AgendaAnnotation));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,AgendaAnnotation)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addAgendaAnnotation(AgendaAnnotation));

          dispatch(selectAgendaAnnotation(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteAgendaAnnotation(AgendaAnnotation,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+AgendaAnnotation._id)
        .then(( response ) => {

          dispatch(removeAgendaAnnotation(AgendaAnnotation));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getAgendaAnnotation(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectAgendaAnnotation(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectAgendaAnnotation(
            new AgendaAnnotation()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  