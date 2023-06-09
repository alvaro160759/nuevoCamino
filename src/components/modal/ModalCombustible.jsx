import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Autocompletar } from '../autocomplete/Autocomplete';
import { Box, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import useCombustibles from '../../hooks/useConbustibles';
import { useEffect } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{background:'#2e7d32',color:'white' }} {...other}>
      {children}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            color:'white',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
    </DialogTitle>
  );
};

export const  ModalCombustible=(props)=> {

  const { combustibles, getCombustibles } = useCombustibles();

  useEffect( () => { 
    getCombustibles()    
  },[]);

  return (
    <Box>      
      <BootstrapDialog open={props.open} aria-labelledby="customized-dialog-title">
        <BootstrapDialogTitle onClose={props.CloseModal}>Nuevo item de combustible</BootstrapDialogTitle>
        
        <DialogContent dividers>
        <Grid container spacing={2} >  
          <Grid item xs={12} >
            <Autocompletar label='Seleccione combustible' options={combustibles} cambiar={(event,newValue)=>props.cambiarCombustible(newValue)}></Autocompletar> 
          </Grid>  

          <Grid item xs={12}>
            <TextField label={'Cantidad GL'} sx={{width:'100%'}} type={'number'} onChange={(event)=>props.cambiarCantidad(event)} size='small' InputLabelProps={{shrink: true}}></TextField> 
          </Grid>                  
        </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={props.CloseModal} variant={'contained'} color={'error'}>
            Cancelar
          </Button>
          <Button onClick={()=>props.guardar()} variant={'contained'} color={'success'}>
            Agregar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
