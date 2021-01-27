import {
    SET_AGENDA_ANNOTATIONS,
    ADD_AGENDA_ANNOTATION,
    REMOVE_AGENDA_ANNOTATION,
    SELECT_AGENDA_ANNOTATION
  } from "../constants";
  
  import { AgendaAnnotation } from "models/AgendaAnnotation";

  let index
  
  export function agendaAnnotations(
    state = {
      agendaAnnotations:[],     
      selectedagendaAnnotation: new AgendaAnnotation()
    },
    action
  ) {
    switch (action.type) {
  
      case SET_AGENDA_ANNOTATIONS:
        
        return Object.assign({}, state, {
          agendaAnnotations:action.agendaAnnotations,         
        });
  
      case SELECT_AGENDA_ANNOTATION:
        
        //console.log("on select action",action)
        return Object.assign({}, state, {
          selectedagendaAnnotation:action.agendaAnnotation,         
        });
  
      case ADD_AGENDA_ANNOTATION:
        
        index = state.agendaAnnotations.findIndex(  data => data.id === action.agendaAnnotation.id  );
  
        index ? state.agendaAnnotations[index] = action.agendaAnnotation : state.agendaAnnotations.push(action.agendaAnnotation);
        
        return state;
  
      case REMOVE_AGENDA_ANNOTATION:
  
        index = state.agendaAnnotations.findIndex(  data => data.id === action.agendaAnnotation.id  );
  
        state.agendaAnnotations.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }