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

const ProductsTable = props => {
  const { className, products, medicineSelected, ...rest } = props;

  const classes = useStyles();

  const [selectedProduct, setSelectedProduct ] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);



  const handleSelectOne = (event) => {    
    setSelectedProduct(event.target.value)  
    medicineSelected(event.target.value)
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
                  <TableCell>Via de administración</TableCell>
                  <TableCell>Presentación</TableCell>
                  <TableCell>Valor</TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={product.id}
                    
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedProduct === product._id}
                        color="primary"
                        name="selectedProduct"
                        onChange={handleSelectOne}
                        value={product._id}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={  process.env.REACT_APP_SERVE_IMAGE + product.picture}
                        >
                          {getInitials(product.name)}
                        </Avatar>
                        <Typography variant="body1">{product.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{ product.administrationWay }</TableCell>
                    <TableCell>{ product.presentation }</TableCell>
                    <TableCell>{ product.value }</TableCell>
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
          count={products.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

ProductsTable.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired
};

export default ProductsTable;
