import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Avatar
} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';

import DeleteIcon from '@material-ui/icons/Delete';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 300,
    width: 350,
    flexShrink: 0,
    flexGrow: 0
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
    cursor: 'pointer'
  }
}));

const MedicalCenterCard = props => {
  const { className, medicalCenter, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
        <Avatar
            className={classes.avatar}
            src={process.env.REACT_APP_SERVE_IMAGE+medicalCenter.picture}
          >
            {getInitials(medicalCenter.name)}
          </Avatar>
         
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {medicalCenter.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          { medicalCenter.description.length > 50 ? medicalCenter.description.substring(0,47)+"..." :  medicalCenter.description }
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
            onClick={()=>{
              props.editButton(medicalCenter._id)
            }}
          >
            <CreateIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Editar
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <DeleteIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
              onClick={()=>{
                props.deleteButton(medicalCenter._id)
              }}
            >
              Eliminar
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

MedicalCenterCard.propTypes = {
  className: PropTypes.string,
  medicalCenter: PropTypes.object.isRequired
};

export default MedicalCenterCard;
