import React from 'react';
import { Avatar, Box, Divider, Drawer, Icon, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useNavigate } from 'react-router-dom';

export const Navbar= ( props) => {
  const theme = useTheme();
  const navigate =useNavigate();

  const irMaqPropia=()=>{
    navigate("/home")
  }

  const listarEnviados=()=>{
    navigate("/listarEnviados")
  }

  const irHojaMaqPropia=()=>{
    
  }

  const irHojaMaqAlquilada=()=>{
    
  }
  
    return ( 
      <Drawer color='success'
      open={props.state}
      onClose={props.close}>
        <Box width={theme.spacing(45)} height="100%" flexDirection="column">
          <List sx={{background:'#2e7d32'}}>
          <ListItemButton onClick={()=>"hola"} sx={{background:'#2e7d32'}}> 
              <ListItemAvatar>
                <Avatar>                  
                  </Avatar>
              </ListItemAvatar>     
              <ListItemText primary="APP MAQUINARIA" sx={{color:'white',}} />
            </ListItemButton>  
          </List>
          <List>         
              <ListItemButton onClick={()=>irMaqPropia()}>
                <ListItemIcon>
                  <AgricultureIcon></AgricultureIcon>
                </ListItemIcon>
                <ListItemText primary={<Typography type="body2" sx={{fontWeight:'bold'}}>Parte de Maquinaria</Typography>} />
              </ListItemButton>   

              <ListItemButton onClick={()=>listarEnviados()}>
                <ListItemIcon>
                  <NoteAltIcon></NoteAltIcon>
                </ListItemIcon>
                <ListItemText primary={<Typography type="body2" sx={{fontWeight:'bold'}}>Partes enviados</Typography>} />
              </ListItemButton>   
                           
          </List>
        </Box>
      </Drawer> 
     );
}


