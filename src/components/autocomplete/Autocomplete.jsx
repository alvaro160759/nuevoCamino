import React from 'react';
import { Autocomplete,TextField,Box, Typography } from '@mui/material';

export const Autocompletar =(props)=> {
        
        return (            
          <Autocomplete
          sx={{display:props.esconder}}
          id="txtAutocomplete"         
          getOptionLabel={option=>option.DESCRIPCION ? option.DESCRIPCION : ''}
          options={props.options}
          value={props.value}
          disabled={props.disabled}
          renderInput={(params) => 
          <TextField  {...params} label={props.label} error={props.error === ""}
          size='small'
          helperText={props.error === "" ? "Seleccione campo":'' } />}
          isOptionEqualToValue={(option, val) => option.DESCRIPCION === val.DESCRIPCION}
          onChange={(event, newValue) => props.cambiar(event,newValue)  }
          noOptionsText={"Sin resultado"}
          renderOption={(props,item)=>(
            <Box  {...props} key ={Math.random(9999)}>
              {item.ID+"-"+item.DESCRIPCION}
            </Box>
          )}
          />
          );


}


 