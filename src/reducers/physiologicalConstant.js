import {
    SET_PHYSIOLOGICAL_CONSTANTS,
    ADD_PHYSIOLOGICAL_CONSTANT,
    REMOVE_PHYSIOLOGICAL_CONSTANT,
    SELECT_PHYSIOLOGICAL_CONSTANT
  } from "../constants";
  
  let index
  
  export function physiologicalConstants(
    state = {
      physiologicalConstants:[],     
      selectedPhysiologicalConstant:{} 
    },
    action
  ) {
    switch (action.type) {
  
      case SET_PHYSIOLOGICAL_CONSTANTS:
        
        return Object.assign({}, state, {
          physiologicalConstants:action.physiologicalConstants,         
        });
  
      case SELECT_PHYSIOLOGICAL_CONSTANT:
  
        return Object.assign({}, state, {
          selectedPhysiologicalConstant:action.physiologicalConstant,         
        });
  
      case ADD_PHYSIOLOGICAL_CONSTANT:
        
        index = state.physiologicalConstants.findIndex(  data => data.id === action.physiologicalConstant.id  );
  
        index ? state.physiologicalConstants[index] = action.physiologicalConstant : state.physiologicalConstants.push(action.physiologicalConstant);
        
        return state;
  
      case REMOVE_PHYSIOLOGICAL_CONSTANT:
  
        index = state.physiologicalConstants.findIndex(  data => data.id === action.physiologicalConstant.id  );
  
        state.physiologicalConstants.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }