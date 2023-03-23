import React from 'react';
import { useNavigate } from "react-router-dom";
import {ListItem,ListItemText,ListItemAvatar,Typography, Divider, Box, IconButton} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { Dialogs } from '../../components/dialog/Dialog';


export const ListaEnviados = (props) => {

const navigate = useNavigate();

var disabled=true;

function itemSeleccionado(cod,cabecera){
  navigate("/editarParte/"+cod,{state:{cabecera,deshabilitar:disabled}});   
}



  return (
     
    props.datos!=null? props.datos.map((item,i) => (
          <Box key={i}>
            <ListItem key={`item-${i}`} 
            
            // secondaryAction={
            //   <IconButton edge="end" aria-label="delete" onClick={()=>props.abrirDialogBorrar(item.cod)} >
            //       <DeleteForeverIcon color='primary' sx={{color:'red'}}/>
            //     </IconButton>

            
            // }
            
            >

                  
                                                            
                <ListItemAvatar key={`avatar-${i}`} onClick={() => {itemSeleccionado(item.cod, item ),
                                                          console.log(item)}}>
                  <SendToMobileIcon color='warning'/>               
                </ListItemAvatar>
                <ListItemText  
                    key={`txt-${i}`}
                    primary={
                      <Typography
                              variant="h1"
                              color="green"
                              fontSize={14}
                              
                            >
                              {item.IDDOCUMENTO=='PMA'?"PARTE DE MAQUINARIA ALQUILADA": "PARTE DE MAQUINARIA PROPIA"}
                            </Typography> 
                    } 
                    secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={'bold'}
                              fontSize={12}
                            >
                              {item.MAQUINA}
                              
                            </Typography> 
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={'bold'}
                              fontSize={12}
                            >
                              OPERARIO: {item.OPERARIO} || FECHA: {" "+item.FECHA} 
                            </Typography> 
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={'bold'}
                            >
                                                       
                            </Typography> 
                                        
                          </React.Fragment>                  
                        }
                        
                        >
                    
                </ListItemText>
                
                
                    
            </ListItem>   
            <Divider color="green"></Divider>        
            </Box>       
   
          )):"sin registros"
                          
  );

}

 
