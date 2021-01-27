import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  //Checkbox,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';

import  PictureModal  from 'components/PictureModal'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PatientsTable = props => {
  const { className, patients, species, breeds, ...rest } = props;

  const classes = useStyles();

  const [selectedPatient, setSelectedPatient ] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [openPm, setOpenPm] = useState(false);

  const [picturePm, setPicturePm] = useState(null);

  const openPictureModal = (picture) => {
    setPicturePm(process.env.REACT_APP_SERVE_IMAGE+picture)
    setOpenPm(true)
  }

  const closePictureModal = () => {
    setOpenPm(false)
  }

  const handleSelectOne = (event) => {    
    setSelectedPatient(event.target.value)
    props.addSelectedPatient(event.target.value)
  };

  const handlePageChange = (event, page) => {
    console.log("handle change",event,page)
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    console.log("rows per page event")
    setRowsPerPage(event.target.value);
    setPage(0)
  };

  return (
    <div>
      <PictureModal open={openPm}  picture={picturePm} handleClose={closePictureModal} ></PictureModal>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                    
                    </TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Estrato</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Fecha de nacimiento</TableCell>
                    <TableCell>Fecha de registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(patient => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={patient.id}
                      
                    >
                      <TableCell padding="checkbox">
                        <Radio
                          checked={selectedPatient === patient._id}
                          color="primary"
                          name="selectedPatient"
                          onChange={handleSelectOne}
                          value={patient._id}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            onClick={()=>{ openPictureModal(patient.picture)  }}
                            className={classes.avatar}
                            src={  process.env.REACT_APP_SERVE_IMAGE + patient.picture}
                          >
                            {getInitials(patient.name)}
                          </Avatar>
                          <Typography variant="body1">{patient.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{ patient.lastName }</TableCell>
                      <TableCell>{ patient.email }</TableCell>
                      <TableCell>{ patient.address }</TableCell>
                      <TableCell>{ patient.stratus }</TableCell>
                      <TableCell>{ patient.cityDetails[0]?.name }</TableCell>
                      <TableCell>{ patient.phone }</TableCell>
                      <TableCell>{ patient.birthDate.split("T")[0] }</TableCell>
                      <TableCell>
                        {/* moment(patient.date).format('DD/MM/YYYY') */}
                        { patient.date.split(" ")[0] }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={patients.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </div>   
  );
};

PatientsTable.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
};

export default PatientsTable;
