import {
    SET_THERAPEUTIC_PLANS,
    ADD_THERAPEUTIC_PLAN,
    REMOVE_THERAPEUTIC_PLAN,
    SELECT_THERAPEUTIC_PLAN
  } from "../constants";
  
  import { TherapeuticPlan } from "models/therapeuticPlan";

  let index
  
  export function therapeuticPlans(
    state = {
      therapeuticPlans:[],     
      selectedTherapeuticPlan: new TherapeuticPlan()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_THERAPEUTIC_PLANS:
        
        return Object.assign({}, state, {
          therapeuticPlans:action.therapeuticPlans,         
        });
  
      case SELECT_THERAPEUTIC_PLAN:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedTherapeuticPlan:action.therapeuticPlan,         
        });
  
      case ADD_THERAPEUTIC_PLAN:
        
        index = state.therapeuticPlans.findIndex(  data => data.id === action.therapeuticPlan.id  );
  
        index ? state.therapeuticPlans[index] = action.therapeuticPlan : state.therapeuticPlans.push(action.therapeuticPlan);
        
        return state;
  
      case REMOVE_THERAPEUTIC_PLAN:
  
        index = state.therapeuticPlans.findIndex(  data => data.id === action.therapeuticPlan.id  );
  
        state.therapeuticPlans.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }