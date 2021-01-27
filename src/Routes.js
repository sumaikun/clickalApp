import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  DoctorList as DoctorListView,  
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  UserForm as UserFormView,
  DoctorForm as DoctorFormView,
  PatientList as PatientListView,
  PatientForm as PatientFormView,
  Parameters as ParametersView,
  MedicalRecords as MedicalRecordsView,
  Agenda as  AgendaView,
  RecoverPassword as RecoverPasswordView,
  ConfirmAccount as ConfirmAccountView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/users"
      />
      <RouteWithLayout
        component={DoctorListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/doctors"
      />
      <RouteWithLayout
        component={UserFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/users/form"
      />
      <RouteWithLayout
        component={DoctorFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/doctors/form"
      />
      <RouteWithLayout
        component={PatientListView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/patients"
      />
      <RouteWithLayout
        component={PatientFormView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/patients/form"
      />
      <RouteWithLayout
        component={AgendaView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/agenda"
      />
      <RouteWithLayout
        component={ParametersView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/parameters"
      />
      <RouteWithLayout
        component={MedicalRecordsView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/medicalRecords"
      />      
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        authenticated={true}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}     
        path="/sign-in"
      />
      <RouteWithLayout
        component={RecoverPasswordView}
        exact
        layout={MinimalLayout}     
        path="/recover-password"
      />
      <RouteWithLayout
        component={RecoverPasswordView}
        exact
        layout={ConfirmAccountView}     
        path="/confirm-account"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
