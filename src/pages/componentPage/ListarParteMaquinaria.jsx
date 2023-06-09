import React from 'react';
import { useNavigate } from "react-router-dom";
import {ListItem,ListItemText,ListItemAvatar,Typography, Divider, Box, IconButton, Tooltip, Chip} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import BackupIcon from '@mui/icons-material/Backup';


export const ListaParteMaq = (props) => {

const navigate = useNavigate();

function enviarParte(cod,cabecera){
  navigate("/enviarParte/"+cod,{state:{cabecera,deshabilitar:false}});   
}

function editarParte(cod,cabecera){
  navigate("/editarParte/"+cod,{state:{cabecera,deshabilitar:false}});   
}



  return (
     
    props.datos!=null? props.datos.map((item,i) => (
      
      
          <Box key={i}>
            <ListItem key={`item-${i}`}             
              secondaryAction={
                <>
                <Tooltip title="Editar">
                  <IconButton edge="end" aria-label="delete" onClick={() => {editarParte(item.cod, item )}}>
                      <DriveFileRenameOutlineRoundedIcon color='primary' sx={{color:'#ed6c02',marginRight:1,height:30,width:30}}/>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Eliminar">
                  <IconButton edge="end" aria-label="delete" onClick={()=>props.abrirDialogBorrar(item.cod)} >
                      <DeleteForeverIcon color='primary' sx={{color:'red',marginRight:0,height:30,width:30}}/>
                  </IconButton>
                </Tooltip>
                </>
              }            
            >
                <Tooltip title="Enviar">                                           
                  <ListItemAvatar key={`avatar-${i}`} onClick={() => {enviarParte(item.cod, item )}} >
                    <BackupIcon color='success' sx={{height:45,width:45}}/>               
                  </ListItemAvatar>
                </Tooltip>
                <ListItemText  
                    key={`txt-${i}`}
                    
                    primary={
                      <>
                      {/* <Chip label={'Estado:Pendiente'} size='small' color='warning'/> */}
                      <br />
                      <Typography variant="h1" color="green"fontSize={15} fontWeight={'bold'}>
                         {item.IDDOCUMENTO +" - FECHA: "+item?.FECHA}
                      </Typography> 
                      </>
                      
                    } 
                    secondary={
                          <>
                            <Typography component="span" variant="body2" fontWeight={'bold'} fontSize={12}>                            
                              {item?.MAQUINA.DESCRIPCION}
                            </Typography> 
                            <br />
                            <Typography component="span" variant="body2" fontWeight={'bold'} fontSize={12}>
                              OPERARIO: {item?.OPERARIO.DESCRIPCION} 
                            </Typography>                                       
                          </>                  
                        }                        
                />
            </ListItem>   
            <Divider color="green"></Divider>        
            </Box>       
   
          )):"sin registros"
                          
  );

}

 
