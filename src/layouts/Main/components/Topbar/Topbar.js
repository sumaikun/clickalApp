import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PetsIcon from '@material-ui/icons/Pets';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Swal from 'sweetalert2'

import { connect } from "react-redux"

import { logoutUser } from "actions/auth"

import clicalPicture from 'assets/branding/Clicalmedic/logoclic-03.png'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {

  //console.log("topbar props",props);

  const { className, onSidebarOpen } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const signOut = () =>{

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

  return (
    <AppBar
     
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img style={{width:"150px"}} src={clicalPicture} alt="Clickal Icon"></img>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick = {signOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

const mapDispatchToProps = {
  logoutUser,
 };

export default connect( null , mapDispatchToProps )(Topbar);
