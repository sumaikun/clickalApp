import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Lock from '@material-ui/icons/Lock';
import Build from '@material-ui/icons/Build';
import Book from '@material-ui/icons/Book';
import Swal from 'sweetalert2'
//import { Profile, SidebarNav, UpgradePlan } from './components';

import { Profile, SidebarNav } from './components';
import { connect } from "react-redux"
import { logoutUser } from "actions/auth"
//import { getUsers } from "actions/users"

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

//specialistType --> identify Doctor

//if has role is a system on 

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const logoutUserAction = () => {
  
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Vas a salir del sistema!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, adelante!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        props.logoutUser();
        window.location.reload();
      }
    })
   
  }

  let pages = [
    {
      title: 'Analítica',
      href: '/dashboard',
      icon: <DashboardIcon />
    }
  ] 

  if(props.authState.user.role === "ADMIN")
  {
    pages.push({
      title: 'Usuarios',
      href: '/users',
      icon: <PeopleIcon />
    })   
  }

  if(props.authState.user.role)
  {
    pages.push({
      title: 'Médicos',
      href: '/doctors',
      icon: <LocalHospitalIcon />
    },
    {
      title: 'Pacientes',
      href: '/patients',
      icon: <AccessibilityIcon />
    },
    {
      title: 'Parametrización',
      href: '/parameters',
      icon: <Build />
    })   
  }

  if(props.authState.user.specialistType)
  {
    pages.push(
    {
      title: 'Pacientes',
      href: '/patients',
      icon: <AccessibilityIcon />
    }) 
  }

  if(!props.authState.user.role)
  {
    pages.push(
      {
        title: 'Agenda',
        href: '/agenda',
        icon: <Book />
      },      
      {
        title: 'Configuración',
        href: '/settings',
        icon: <SettingsIcon />
      }
    )
  }

  /* let pages = [
    
    
    {
      title: 'Productos',
      href: '/products',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Centros Médicos',
      href: '/medicalCenters',
      icon: <BusinessCenterIcon />
    },
    {
      title: 'Agenda',
      href: '/agenda',
      icon: <Book />
    },      
    {
      title: 'Configuración',
      href: '/settings',
      icon: <SettingsIcon />
    },
    {
      action: logoutUserAction,
      title: 'Cerrar sesión',
      icon: <Lock/>
    }
  ];*/


  if(props.authState.user.role === "DEVELOPER")
  {
    pages.push({
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    })
    pages.push({
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />
    })     
  }

  pages.push({
    action: logoutUserAction,
    title: 'Cerrar sesión',
    icon: <Lock/>
  })     


  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div       
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        { /* <UpgradePlan /> */ }
        
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};


const mapStateToProps = state => {
 
  return {
    authState: state.auth,  
  };
}

const mapDispatchToProps = {
  logoutUser,
  //getUsers,
 };

export default connect( mapStateToProps , mapDispatchToProps )(Sidebar);

