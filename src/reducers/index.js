import { combineReducers } from "redux";
import { auth } from "./auth";
import { app } from "./app";
import { users } from "./users";
import { products } from "./products";
import { doctors } from "./doctors";
import { patients } from "./patients";
import { parameters } from "./parameters";
import { patientReviews } from "./patientReviews";
import { physiologicalConstants } from "./physiologicalConstant"
import { appointments } from "./appointments"
import { patientFiles } from "./patientFiles"
import { agendaAnnotations } from "./agendaAnnotations"
import { settings } from "./settings"

const reducers = combineReducers({
  auth,
  app,
  users,
  products,
  doctors,
  patients,
  parameters,
  patientReviews,
  physiologicalConstants,
  appointments,
  patientFiles,
  agendaAnnotations,
  settings
});

export default reducers;