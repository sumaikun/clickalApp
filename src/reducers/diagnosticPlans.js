import {
    SET_DIAGNOSTIC_PLANS,
    ADD_DIAGNOSTIC_PLAN,
    REMOVE_DIAGNOSTIC_PLAN,
    SELECT_DIAGNOSTIC_PLAN
  } from "../constants";
  
  import { DiagnosticPlan } from "models/diagnosticPlan";

  let index
  
  export function diagnosticPlans(
    state = {
      diagnosticPlans:[],     
      selectedDiagnosticPlan: new DiagnosticPlan()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_DIAGNOSTIC_PLANS:
        
        return Object.assign({}, state, {
          diagnosticPlans:action.diagnosticPlans,         
        });
  
      case SELECT_DIAGNOSTIC_PLAN:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedDiagnosticPlan:action.diagnosticPlan,         
        });
  
      case ADD_DIAGNOSTIC_PLAN:
        
        index = state.diagnosticPlans.findIndex(  data => data.id === action.diagnosticPlan.id  );
  
        index ? state.diagnosticPlans[index] = action.diagnosticPlan : state.diagnosticPlans.push(action.diagnosticPlan);
        
        return state;
  
      case REMOVE_DIAGNOSTIC_PLAN:
  
        index = state.diagnosticPlans.findIndex(  data => data.id === action.diagnosticPlan.id  );
  
        state.diagnosticPlans.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }