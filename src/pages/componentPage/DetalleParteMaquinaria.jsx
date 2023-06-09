import React, {useEffect, useState} from 'react';
import { ListItem,ListItemAvatar, Avatar, ListItemText, Typography,Divider,List, Grid,TextField, Card, CardActionArea, CardContent, Box} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';



export const Detalle =(props)=>{
  return (
    
    props.detalle.map((item,i) => (  
        
        <Box key={i} >        
          <ListItem key={i}  onClick={() => props.itemSeleccionado?props.itemSeleccionado(props.detalle[i],i):""} sx={{marginLeft:0}}>
        
            <ListItemAvatar >              
                <ArticleIcon />            
            </ListItemAvatar>

              <Grid container spacing={0}>     
                <Grid  item xs={12}>                           
                  <Typography sx={{fontSize:11,fontWeight:'bold'}}>{item.CONSUMIDOR.ID +" - "+ item.CONSUMIDOR.DESCRIPCION}</Typography>
                  <Typography style={{fontSize:10}}>Labor: {item.LABOR.ID +" - "+ item.LABOR.DESCRIPCION}</Typography> 
                  <Typography sx={{fontSize:10}}>{item.JIRON.DESCRIPCION} - {item.CUARTEL.DESCRIPCION}- Area(Has): {parseFloat(item.AREA_TRAB).toFixed(2)}  </Typography>
                </Grid>
              </Grid>         
           
          </ListItem> 
          <Divider color="success"></Divider>     
        
      </Box>            
                    
    
    ))    
  );
}
