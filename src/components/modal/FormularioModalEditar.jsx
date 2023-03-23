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
import { Grid, TextField } from '@mui/material';

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

export const  FormularioModalEditar=(props)=> {

  return (
    <div>
      
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
          Editar Item
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid container spacing={2} >  

          <Grid item xs={12} >
            <TextField
            id="txtOperario"
            label="Consumidor"
            size='small'
            value={props.idConsumidor}
            sx={{width:'100%'}}
            InputLabelProps={{shrink: true}}
            />          
          </Grid>  
          <Grid item xs={6} >
            <TextField
            label="Lote"
            size='small'
            value={props.jiron}
            sx={{width:'100%'}}
            InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
            id="txtOperario"
            label="Válvula"
            size='small'
            value={props.cuartel}
            sx={{width:'100%'}}
            InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={6}>
          <TextField label={'Area'} sx={{width:'100%'}} type={'number'} defaultValue={props.areaTrabajada} onChange={(event)=>props.cambiarAreaTrabajada(event)} size='small' InputLabelProps={{shrink: true}}></TextField> 
          </Grid>
           
    </Grid>
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={props.dialogBorrar} variant={'contained'} color={'error'}>
            Borrar
          </Button>
          <Button onClick={()=>props.guardar()} variant={'contained'} color={'success'} disabled={props.buttonModal}>
            Editar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
