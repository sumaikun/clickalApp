import {
    SET_PRODUCTS,
    REMOVE_PRODUCT,
    SELECT_PRODUCT
  } from "../constants";
  import api from "middleware/api";

  
  
  
  function setMedicines(products) {
    return {
      type: SET_PRODUCTS,   
      products
    };
  }

  function removeMedicine(product) {
    return {
      type: REMOVE_PRODUCT,   
      product
    };
  }

  function selectMedicine(product){
    return{
      type: SELECT_PRODUCT,   
      product
    }
  }

  const modelPoint = "medicines"

  export function getMedicinesByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setMedicines(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function getMedicinesByAppointment(appointment,cb=null) {
    
    return dispatch => {
      return api.getData("medicinesByAppointment"+"/"+appointment)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setMedicines(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }

  export function saveMedicine(medicine,cb = null) {
  
    return dispatch => {
      
      if(medicine._id){
        return api.putData(modelPoint+"/"+medicine._id,medicine)
        .then(( response ) => {
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,medicine)
        .then(( response ) => {

          dispatch(selectMedicine(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  
  
  