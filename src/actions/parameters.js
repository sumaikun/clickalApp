import {
    SET_PARAMETERS,
    ADD_PARAMETER,
    REMOVE_PARAMETER,
    SELECT_PARAMETER
  } from "../constants";
  import api from "middleware/api";
  import { Breed } from "models/Breed";
  import { Species } from "models/Species";  
  
  function setParameter(parameters) {
    return {
      type: SET_PARAMETERS,   
      parameters
    };
  }

  function addParameter(parameter) {
    return {
      type: ADD_PARAMETER,   
      parameter
    };
  }

  function removeParameter(parameter) {
    return {
      type: REMOVE_PARAMETER,   
      parameter
    };
  }

  function selectParameter(parameter){
    return{
      type: SELECT_PARAMETER,   
      parameter
    }
  }
  
  
  export function getParameters(cb=null,modelPoint) {
    
    
    return dispatch => {
      return api.getData(modelPoint)
        .then(( response ) => {

          dispatch(setParameter(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveParameter(parameter,cb = null,modelPoint) {
  
    return dispatch => {
      
      if(parameter._id){
        return api.putData(modelPoint+"/"+parameter._id,parameter)
        .then(( response ) => {

          //dispatch(addParameter(parameter));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,parameter)
        .then(( response ) => {

          //dispatch(addParameter(parameter));

          dispatch(selectParameter(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteParameter(parameter,cb,modelPoint) {
  
    return dispatch => {
      return api.deleteData(modelPoint+"/"+parameter._id)
        .then(( response ) => {

          dispatch(removeParameter(parameter));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getParameter(id,cb = null,modelPoint) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectParameter(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        const expr = modelPoint
        
        switch (expr) {
          case 'breeds':
            dispatch(selectParameter(
              new Breed()
            ));
            break;
          case 'species':
            dispatch(selectParameter(
              new Species()
            ));
            break;        
          default:
            console.log('Lo lamentamos, por el momento no disponemos de ' + expr + '.');
        }
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  