import React from 'react';
import { useNavigate } from "react-router-dom";
import {ListItem,ListItemText,ListItemAvatar,Typography, Divider, Box, IconButton, Chip} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


export const ListaEnviados = (props) => {

  
const navigate = useNavigate();
function itemSeleccionado(cod,cabecera){
  navigate("/enviarParte/"+cod,{state:{cabecera,deshabilitar:true}});   
}
  return (
     
    props.datos!=null? props.datos.map((item,i) => (
          <Box key={i}>
            <ListItem key={`item-${i}`}             
              secondaryAction={
                item.ESTADO=='E'?
                  <IconButton edge="end" aria-label="delete" onClick={()=>props.abrirDialogBorrar(item.IDPARTEMAQ,item)} >
                    <HighlightOffIcon color='primary' sx={{color:'red',height:50,width:50}}/>
                  </IconButton>:""
              }
            >                     
                <ListItemAvatar key={`avatar-${i}`} onClick={() => itemSeleccionado(item.cod, item )}>
                  <TaskAltIcon color='warning' sx={{height:45,width:45}}/>               
                </ListItemAvatar>
                <ListItemText  
                    key={`txt-${i}`}
                    primary={
                            <>
                            <Chip label={item.ESTADO=='A'?"Estado: Anulado":"Estado: Enviado"} size='medium' color={item.ESTADO==='A'?'error':'success'}/>
                            <p />
                            <Typography
                              variant="h1"
                              color="green"
                              fontSize={16}
                              fontWeight={'bold'}
                              
                            >
                              {"PARTE DE MAQUINARIA:"+item.IDDOCUMENTO+'-0002-'+item.NUMERO}
                            </Typography> 
                            </>
                            
                    } 
                    secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={'bold'}
                              fontSize={14}
                            >
                              {item.MAQUINA.DESCRIPCION}
                              
                            </Typography> 
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={'bold'}
                              fontSize={12}
                            >
                              OPERARIO: {item.OPERARIO.DESCRIPCION} || FECHA: {" "+item.FECHA} 
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

 
