import * as React from 'react';
import { IconButton,AppBar,Toolbar,Typography,CssBaseline,useScrollTrigger, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from '../navbar/Navbar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';

export const Appbar=(props)=> {

      const [state, setState] = React.useState(false);
      function ElevationScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
          disableHysteresis: true,
          threshold: 0,
          target: window ? window() : undefined,
        });
      
        return React.cloneElement(children, {
          elevation: trigger ? 4 : 0,
        });
      }

      
    
      const toggleDrawer =(open) =>(event) => {
          if (event.type === 'keydown' &&((event).key === 'Tab' ||(event).key === 'Shift')) {
            return;
          }    
          setState(open);
        };
        
      return (
        <React.Fragment>
          <CssBaseline />
          <ElevationScroll {...props}>
            <AppBar sx={{ flexGrow: 1, display:props.header, background : '#2e7d32'}}>
              <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}>
                <MenuIcon/>           
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.nombre} 
              </Typography>
                <Button color="inherit" endIcon={<ExitToAppIcon />} onClick={props.salir} sx={{display:props.mostrarSalir}}>Salir</Button>
                <Button variant='contained' color='warning' startIcon={<SendIcon/>} onClick={props.enviar} sx={{display:props.mostrarEnviar, borderRadius:4}}>Enviar</Button>
                <Button sx={{display:props.mostrarGuardar, borderRadius:4}} variant='contained' color={'warning'} 
                  onClick={props.guardar} disabled={props.deshabilitar}
                  startIcon={<SaveIcon />}>Guardar</Button>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Navbar state={state} close={toggleDrawer(false)} ></Navbar>
        </React.Fragment>
      );
}
