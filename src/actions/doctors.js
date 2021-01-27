import {
    SET_DOCTORS,
    ADD_DOCTOR,
    REMOVE_DOCTOR,
    SELECT_DOCTOR
  } from "../constants";
  import api from "middleware/api";
  import { Doctor } from "models/Doctor";  

  
  
  
  function setDoctors(doctors) {
    return {
      type: SET_DOCTORS,   
      doctors:doctors
    };
  }

  function addDoctor(doctor) {
    return {
      type: ADD_DOCTOR,   
      doctor:doctor
    };
  }

  function removeDoctor(doctor) {
    return {
      type: REMOVE_DOCTOR,   
      doctor:doctor
    };
  }

  function selectDoctor(doctor){
    return{
      type: SELECT_DOCTOR,   
      doctor:doctor
    }
  }
  
  
  export function getDoctors(cb=null) {
    
    
    return dispatch => {
      return api.getData("doctors")
        .then(( response ) => {

          dispatch(setDoctors(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveDoctor(doctor,cb = null) {
  
    return dispatch => {
      
      if(doctor._id){
        return api.putData("doctors/"+doctor._id,doctor)
        .then(( response ) => {

          //dispatch(addDoctor(doctor));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData("doctors",doctor)
        .then(( response ) => {

          //dispatch(addDoctor(doctor));

          dispatch(selectDoctor(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteDoctor(doctor,cb) {
  
    return dispatch => {
      return api.deleteData("doctors/"+doctor)
        .then(( response ) => {

          //dispatch(removeDoctor(doctor));   
          if(cb) { cb(true,false) }         
        
        })
        .catch(err => { console.log("Error: ", err)
        if(cb) { cb(false,true) }  
        });
    }
  }

  export function getDoctor(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData("doctors/"+id)
        .then(( response ) => {

          dispatch(selectDoctor(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectDoctor(
          new Doctor()
        ));
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  