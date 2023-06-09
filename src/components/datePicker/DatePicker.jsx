import { TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import AdapterJalaali from '@date-io/moment';
import React from 'react';

const InputFecha = (props) => {
    return (  
        <LocalizationProvider dateAdapter={AdapterJalaali}>

            <MobileDatePicker
            fontSize={10}
            inputFormat="DD/MM/yyyy"
            label={props.label}
            mask="__/__/____"            
            value={props.fecha}
            
            sx={{fontSize:10}}          
            onChange={newValue => {props.asignarFecha(newValue)}}
            renderInput={(params) => <TextField size='small' {...params} />}
            />

        </LocalizationProvider>
    );
}
 
export default InputFecha;


