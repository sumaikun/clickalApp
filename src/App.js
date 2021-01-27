import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import { connect } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Loading from 'components/Loading'
import { ConfirmProvider } from 'material-ui-confirm';

import {
  SET_FETCHING,  
} from "./constants";

const browserHistory = createBrowserHistory();



class App extends Component{

  constructor(props){
    super(props)
    Window.Store.dispatch({type:SET_FETCHING,payload:false})  
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("should update");
    return nextProps === this.props
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        {
          this.props.appState.loading ?
          <Loading/> 
          :  
          <Router history={browserHistory}>
            <ConfirmProvider>
              <Routes />
            </ConfirmProvider>            
          </Router>
        }
      </ThemeProvider>    
    );  
  }

  
}

const mapStateToProps = state => {
  return {
    appState: state.app,  
  };
}


export default  connect(mapStateToProps, null)(App);