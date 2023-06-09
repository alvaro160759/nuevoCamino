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
import useConsumidores from '../../hooks/useConsumidores';
import { useEffect } from 'react';
import useJirones from '../../hooks/useJirones';
import useCuartel from '../../hooks/useCuartel';

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



export const  FormularioModal=(props)=> {

  const { consumidores, getConsumidores } = useConsumidores();
  const { jirones, getJirones } = useJirones();
  const { cuarteles, getCuarteles } = useCuartel();

  
  useEffect( () => {
    
    getConsumidores()
    getJirones();
    getCuarteles()
  },[]);


  return (
    <Box>      
      <BootstrapDialog open={props.open} aria-labelledby="customized-dialog-title">
        <BootstrapDialogTitle onClose={props.handleCloseModal}>{props.editar==false?"Nuevo Item":"Editar Item"}</BootstrapDialogTitle>
        
        <DialogContent dividers>
        <Grid container spacing={2} >  
          <Grid item xs={12}>
          <Autocompletar label='Consumidor'options={consumidores} cambiar={(event,newValue)=>props.cambiarConsumidor(newValue)} value={props.consumidor}></Autocompletar> 
          </Grid>  
          
          <Grid item xs={6}>
            <Autocompletar label='Lote' options ={jirones} cambiar={(event,newValue)=>props.cambiarJiron(newValue)} value={props.jiron}></Autocompletar> 
          </Grid>

          <Grid item xs={6}>
            <Autocompletar label='Válvula' options={cuarteles} cambiar={(event,newValue)=>props.cambiarCuartel(newValue)} value={props.cuartel}></Autocompletar> 
          </Grid>

          <Grid item xs={6}>
            <TextField label={'Area'} sx={{width:'100%'}} type={'number'} onChange={(event)=>props.cambiarAreaTrabajada(event)} size='small' InputLabelProps={{shrink: true}} value={props.areaItem}></TextField> 
          </Grid>                  
        </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={()=>props.editar!=false?props.dialogBorrar():props.handleCloseModal()} variant={'contained'} color={'error'}>
          {props.editar!=false?"Borrar":"Cerrar"}
          </Button>
          <Button onClick={()=>props.guardar()} variant={'contained'} color={'success'} >
            {props.editar!=false?"Editar":"Agregar"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
