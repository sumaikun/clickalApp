import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal, Backdrop, Fade,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slide,
    Typography  
  } from '@material-ui/core'
  

import ProductsTable from 'views/ProductList/components/ProductsTable'

import { SearchInput } from 'components';

import  api  from 'middleware/api'

import 'date-fns';

import Swal from 'sweetalert2'

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
  },
  dialogPaper: {
    width: '200%',
  },
}));

const PetsMedicine = props => {
  
  const {  open, products,selectProduct, handleClose,  ...rest } = props;

  //console.log("pets medicine props",props)

  const [selectedProduct, setSelectedProduct] = useState(null);
   
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [openMedicineConfirmation, setOpenMedicineConfirmation] = useState(false);

  useEffect(() => {
      console.log("products",props.products)
    setFilteredProducts(products)
  },[]); 
  
  const addFilterText = event => {
    //console.log("filter text",event.target.value)

    const data = event.target.value.toLowerCase()

    if(data.length == 0)
    {
        setFilteredProducts(products)
    }else
    {

      const filteredArray = products.filter( product => 
        (product.name ? product.name.toLowerCase().includes(data) : false) ||
        (product.value ? product.value.includes(data) : false) ||
        (product.administrationWay ? product.administrationWay.toLowerCase().includes(data) : false) ||
        (product.presentation ? product.presentation.toLowerCase().includes(data) : false)
      )

      setFilteredProducts(filteredArray)      

    }
  }

  const medicineSelected = (data) => {
    
    const product = products.filter( product => product._id === data  )[0]
    console.log("medicineSelected",product)
    setOpenMedicineConfirmation(true)
    setSelectedProduct(product)
  }

  const confirmMedicine = () => {
    setOpenMedicineConfirmation(false)
    
    selectProduct(selectedProduct)
    window.setTimeout(function(){ handleClose() }, 500);
    //
  }

  const cancelMedicine = () => {
    setOpenMedicineConfirmation(false)
  }
  
  const classes = useStyles();

    return (
        <div>
            <Dialog
                open={open}              
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Medicamento"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Seleccione el medicamento
                </DialogContentText>    
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Buscar"
                    onChange={addFilterText}
                />  
                <ProductsTable medicineSelected={medicineSelected} products={filteredProducts || []} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cerrar
                </Button>       
            </DialogActions>
            </Dialog>
            <Dialog
                open={openMedicineConfirmation}
                onClose={cancelMedicine}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                Desea seleccionar este producto
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Este producto se asociara al plan terapeutico actual
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={cancelMedicine} color="primary">
                    Cancelar
                </Button>
                <Button onClick={confirmMedicine} color="primary">
                    Afirmar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
      
    );
};


export default PetsMedicine;
