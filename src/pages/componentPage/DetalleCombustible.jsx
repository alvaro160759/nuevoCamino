import React, {useEffect, useState} from 'react';
import { ListItem,ListItemAvatar, Avatar, ListItemText, Typography,Divider,List, Grid,TextField, Card, CardActionArea, CardContent, Box} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';



export const DetalleCombustible =(props)=>{
  
  return (
    
    props.combustible.map((item,i) => (          
        
        <Box key={i} >        
          <ListItem key={i}  onClick={() => props.itemSeleccionado(props.combustible[i],i)} sx={{marginLeft:0}}>
          	
            <ListItemAvatar >              
                <LocalGasStationIcon />            
            </ListItemAvatar>
            
              <Grid container spacing={0}>     
                <Grid  item xs={12}>                           
                  <Typography sx={{fontSize:12,fontWeight:'bold'}}>{item.IDCOMBUSTIBLE+'-'+item.DESCRIPCION}</Typography> 
                  <Typography sx={{fontSize:12}}>Cantidad: {item.CANTIDAD} - {item.IDMEDIDA}   </Typography>
                </Grid>
              </Grid>         
           
          </ListItem> 
          <Divider color="success"></Divider>     
        
      </Box>            
                    
    
    ))    
  );
}
