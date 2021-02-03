import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  console.log("props",props)

  const classes = useStyles();

  const user = {
    name: props.authState.user.name + " " +props.authState.user.lastName,
    avatar: process.env.REACT_APP_SERVE_IMAGE+props.authState.user.picture,
    bio:  props.authState.user.role  || props.authState.userType == 2 &&  "DOCTOR" || props.authState.userType == 3 & "PATIENT"
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authState: state.auth,  
  };
}


export default  connect(mapStateToProps, null )(Profile);
