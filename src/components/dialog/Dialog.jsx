import {
    Button,Dialog,DialogActions,DialogTitle, MenuItem, TextField, Typography} from '@mui/material'
import React from 'react'
import { Autocompletar } from '../autocomplete/Autocomplete'


export const Dialogs = (props) => {
    return (
        <Dialog open={
                props.open
            }
            onClose={
                props.cerraDialog
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {props.mensaje} 
                <p></p>
                
                {props.flag==true &&
                <>
                <TextField
                    id="txtturno" 
                    select
                    label="¿Maquina utilizó Implemento de terceros?"
                    size='small'
                    value={props.implemento}
                    sx={{width:'100%',display:props.esconder}}
                    onChange={(event,newvalue)=>props.cambiarImplemento(event,newvalue)}
                >
                    <MenuItem key="1" value="1" >
                        <Typography fontSize={12}>Si</Typography>
                    </MenuItem>

                    <MenuItem key="0" value="0" >
                        <Typography fontSize={12}>No</Typography>
                    </MenuItem>
                    </TextField> 
                    <p></p>
                <Autocompletar
                 esconder={props.esconder} 
                 label={'Seleccione Responsable'} 
                 options={props.responsbles} 
                 cambiar={(event,newValue)=>props.cambiarResponsable(newValue)} 
                 ></Autocompletar>
                 
                 </>
                  }
            </DialogTitle>
            <DialogActions>
                <Button 
                sx={{display:props.display}}
                onClick={
                    props.cerrar
                }>Cancelar</Button>
                <Button onClick={
                        props.aceptar
                    }
                    disabled={props.disabled}
                    autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

