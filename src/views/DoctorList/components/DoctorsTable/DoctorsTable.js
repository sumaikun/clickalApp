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

import  PictureModal  from 'components/PictureModal'

import { getInitials } from 'helpers';

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

const DoctorsTable = props => {
  const { className, doctors, ...rest } = props;

  const classes = useStyles();

  const [selectedDoctor, setSelectedDoctor ] = useState({});
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
    setSelectedDoctor(event.target.value)
    props.addSelectedDoctor(event.target.value)
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
                    <TableCell>Nombres</TableCell>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Correo</TableCell>                  
                    <TableCell>Telefóno</TableCell>
                    <TableCell>Telefóno 2</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Tipo ID</TableCell>
                    <TableCell>Identificación</TableCell>
                    <TableCell>fecha de registro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doctor => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={doctor._id}
                      
                    >
                      <TableCell padding="checkbox">
                        <Radio
                          checked={selectedDoctor === doctor._id}
                          color="primary"
                          name="selectedDoctor"
                          onChange={handleSelectOne}
                          value={doctor._id}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            onClick={()=>{ openPictureModal(doctor.picture)  }}
                            className={classes.avatar}
                            src={  process.env.REACT_APP_SERVE_IMAGE + doctor.picture}
                          >
                            {getInitials(doctor.name)}
                          </Avatar>
                          <Typography variant="body1">{doctor.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{ doctor.lastName }</TableCell>
                      <TableCell>{ doctor.email }</TableCell>
                      <TableCell>{ doctor.phone }</TableCell>
                      <TableCell>{ doctor.phone2 }</TableCell>
                      <TableCell>{ doctor.cityDetails[0]?.name }</TableCell>
                      <TableCell>{ doctor.state }</TableCell>
                      <TableCell>{ doctor.typeId }</TableCell>                    
                      <TableCell>{ doctor.identification }</TableCell>                    
                      <TableCell>
                        {/* moment(doctor.date).format('DD/MM/YYYY') */}
                        { doctor.date.split(" ")[0] }
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
            count={doctors.length}
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

DoctorsTable.propTypes = {
  className: PropTypes.string,
  doctors: PropTypes.array.isRequired
};

export default DoctorsTable;
