import React  from 'react';
//import React , { forwardRef } from 'react';
//import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

/*
const CustomRouterLink = forwardRef((props, ref) => (
  <div   
  >
    <RouterLink {...props} />
  </div>
));*/

const DoctorsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  //const [filterText, setFilterText] = useState("");

  const addFilterText = event => {
    //console.log("filter text",event.target.value)
    props.filteredDoctors(event.target.value)
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        
        <Button className={classes.importButton}  disabled={ props.selectedDoctor === null } 
          onClick={props.watchButton}>Ver</Button>

        <Button className={classes.importButton}  disabled={ props.selectedDoctor === null } 
          onClick={props.editButton}>Editar</Button>
        
        <Button className={classes.exportButton} disabled={ props.selectedDoctor === null  } 
          onClick={props.deleteButton}>Inactivar</Button>
        
        {/*<Button
          color="primary"
          variant="contained"
          component={CustomRouterLink}
          to="/doctors/form"
        >
          Agregar Usuario
        </Button>*/}

        <Button
          color="primary"
          variant="contained"
          onClick={props.createButton}
        >
          Agregar Doctor
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Buscar"
          onChange={addFilterText}
        />
      </div>
    </div>
  );
};

DoctorsToolbar.propTypes = {
  className: PropTypes.string
};

export default DoctorsToolbar;
