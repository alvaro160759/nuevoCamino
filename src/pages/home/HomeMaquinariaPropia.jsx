import React, {useEffect,useState} from 'react';
import { Appbar } from '../../components/appBar/AppBar';
import {Grid,Button, List,Fab,Box, FormControlLabel, Switch, Typography, Card, CardContent} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Config} from '../../../config.js'
import Loading from '../../components/loading/loading';
import { useNavigate } from 'react-router-dom';
import { Autocompletar } from '../../components/autocomplete/Autocomplete';
import { ListaParteMaq } from '../componentPage/ListarParteMaquinaria';
import InputFecha from '../../components/datePicker/DatePicker';
import dateFormat from 'dateformat';
import useMaquinaria from '../../hooks/useMaquinaria';
import useParteMaquinaria from '../../hooks/useParteMaquinaria';
import useAuth from '../../hooks/useAuth';
import { Dialogs } from '../../components/dialog/Dialog';

export const HomeMaquinariaPropia = () => {
    
  var usuario=JSON.parse(localStorage.getItem("usuario"))
  var idUsuario=usuario.usuario
  const navigate= useNavigate();
  const { maquinarias, getMaquinarias } = useMaquinaria();
  const { parteMaquinaria, getParteMaquinariaAll,deleteParteMaq,getAllPartes } = useParteMaquinaria();
  const { user, empresa, logOut } =  useAuth();  
  const [openBorrar,setOpenBorrar]=useState(false);
  const [idMquina,setIdMaquina]=useState("")
  const [idparte,setIdParte]=useState("")
  const [fechaBusqueda,setFechaBusqueda]=useState(dateFormat(new Date(),'yyyy-mm-dd'))
  
  const onChangeAutocompleteHome = (newValue) => {
    console.log(newValue)
    if(newValue!=null){
      setIdMaquina(newValue.ID)           
    }else{
      setIdMaquina("");
    }
  }; 

  const salir=()=>{    
      logOut();
      navigate("/",  {replace: true}); 
  }

function listarParteMaquinaria(){    
  getParteMaquinariaAll(fechaBusqueda,idMquina) 
};

function elimnarParte(){   
  deleteParteMaq(idparte)
  getAllPartes()
  setOpenBorrar(false)
    
};

const asignarFechaBusqueda = (newValue) => {
  setFechaBusqueda(dateFormat(newValue,'yyyy-mm-dd')) 
}; 


const cerrarDialogBorrar = () => {
  setOpenBorrar(false);
  
};

const abrirDialogBorrar = (id) => {
  setOpenBorrar(true);
  setIdParte(id)
  
}

  useEffect( () => {
    getMaquinarias()       
    getAllPartes();
    
  },[]);  
  
  return (  
    <div>    
      <Box>     
      
      <Appbar nombre={'Inicio'} salir={salir} mostrarEnviar={"none"} mostrarGuardar={"none"}></Appbar>
      <Dialogs open={openBorrar} cerrar={cerrarDialogBorrar} aceptar={elimnarParte} mensaje={"¿Está seguro de borrar parte de maquinaria?"} esconder={'none'}></Dialogs>
      
      <h3>Listado de Partes de Maquinaria</h3>

      {/* <Card>
        <CardContent>
        <Grid container spacing={1} >
          <Grid item xs={4}>
            <InputFecha fecha={fechaBusqueda} label={"Fecha"} asignarFecha={val=>asignarFechaBusqueda(val)}></InputFecha>
          </Grid>
          <Grid item xs={8}>
          <Autocompletar label={"Buscar Maquina"} options={maquinarias} cambiar={(event,newValue)=>onChangeAutocompleteHome(newValue)}></Autocompletar>
          </Grid>
          
          <Grid item xs={12} sx={{position:'center'}}>
          <Button variant='contained' fullWidth color='success' onClick={()=>listarParteMaquinaria()}>Buscar</Button>
          </Grid> 
        </Grid> 
        </CardContent>
      </Card> */}
       
      {parteMaquinaria.length==0?"No hay partes registrados pendientes de envío":
      <List
            sx={{
              width: '100%',
              maxWidth: '100%',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 500
            }}
            subheader={<li />}
      >
      
      <ListaParteMaq datos={parteMaquinaria} delete={elimnarParte} openBorrar={openBorrar} abrirDialogBorrar={abrirDialogBorrar} cerrarDialogBorrar={cerrarDialogBorrar} />
      
      </List>}
      
      <Fab sx={{position: 'absolute', bottom: 20, right:20}} aria-label={'Add'} color = 'warning' size='large' onClick={()=>navigate("/editarParte/0")}>
            <AddIcon />
      </Fab>
      <Loading open={false} label={"Buscando datos"}></Loading>    
    </Box>
  </div>
  )
}
