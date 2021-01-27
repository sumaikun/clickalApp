import {
    SET_DOCTOR_CONFIG
  } from "../constants";
  import api from "middleware/api";
 


function setDoctorConfig(config) {
    return {
      type: SET_DOCTOR_CONFIG,   
      payload:config
    };
} 
  

export function getDoctorConfig(id,cb = null) {
  
    return dispatch => {

        return api.getData("doctorSettingsByDoctor/"+id)
        .then(( response ) => {

          console.log("response.data",response.data)

          dispatch(setDoctorConfig(response.data))
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
          
    }
}

export function saveDoctorConfig(config,cb = null) {
  
    return dispatch => {

        return api.postData("doctorSettings",config)
        .then(( response ) => {

          console.log("response.data",response.data)

          dispatch(setDoctorConfig(response.data))
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
          
    }
}

export function updateDoctorConfig(id,config,cb = null) {
  
    return dispatch => {

        return api.putData("doctorSettings/"+id,config)
        .then(( response ) => {

          console.log("response.data",response.data)

          dispatch(setDoctorConfig({ ...config }))
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
          
    }
}
  
  
  