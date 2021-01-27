import {
    SET_PARAMETERS,
    ADD_PARAMETER,
    REMOVE_PARAMETER,
    SELECT_PARAMETER
  } from "../constants";
  
  let index
  
  export function parameters(
    state = {
      parameters:[],     
      selectedParameter:{} 
    },
    action
  ) {
    switch (action.type) {
  
      case SET_PARAMETERS:
        
        return Object.assign({}, state, {
          parameters:action.parameters,         
        });
  
      case SELECT_PARAMETER:
  
        return Object.assign({}, state, {
          selectedParameter:action.parameter,         
        });
  
      case ADD_PARAMETER:
        
        index = state.parameters.findIndex(  data => data.id === action.parameter.id  );
  
        index ? state.parameters[index] = action.parameter : state.parameters.push(action.parameter);
        
        return state;
  
      case REMOVE_PARAMETER:
  
        index = state.parameters.findIndex(  data => data.id === action.parameter.id  );
  
        state.parameters.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }