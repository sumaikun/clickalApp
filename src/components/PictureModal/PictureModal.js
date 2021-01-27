import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {   
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from '@material-ui/core'
  
  import Image from 'material-ui-image'

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

const PictureModal = props => {
  
  const {  open, handleClose, picture,  ...rest } = props;

  
  
  const classes = useStyles();

    return (
        <div>           
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogContent>
                    <Image
                        src={picture}
                    />
                </DialogContent>
                <DialogActions>                
                    <Button onClick={handleClose}  color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
      
    );
};


export default PictureModal;
