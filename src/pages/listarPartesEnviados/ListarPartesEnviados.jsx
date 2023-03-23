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
import { ListaEnviados } from '../componentPage/ListaEnviados';

export const ListarPartesEnviados = () => {
    
  var usuario=JSON.parse(localStorage.getItem("usuario"))
  //const empresa=localStorage.getItem("empresa").toString();
  var idUsuario=usuario.usuario
  const navigate= useNavigate();
  const { maquinarias, getMaquinarias } = useMaquinaria();
  const { parteMaquinaria, getParteMaquinariaEnviados,deleteParteMaq } = useParteMaquinaria();
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

function listarParteMaquinaria(){    
  getParteMaquinariaEnviados(fechaBusqueda,idMquina)

    
};

function elimnarParte(){ 
  console.log(idparte)  
  deleteParteMaq(idparte)
  listarParteMaquinaria()
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
    listarParteMaquinaria();
  },[]);  
  
  return (  
    <div>    
      <Box>     
      
      <Appbar nombre={'PARTES ENVIADOS A NISIRA'} mostrarEnviar={"none"} mostrarGuardar={"none"}/>
      <Dialogs open={openBorrar} cerrar={cerrarDialogBorrar} aceptar={elimnarParte} mensaje={"¿Está seguro de borrar parte de maquinaria?"}></Dialogs>
  
      <h3>Buscar Partes enviados</h3>

      <Card>
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
      </Card>
      
       
            
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
      
      <ListaEnviados datos={parteMaquinaria} delete={elimnarParte} openBorrar={openBorrar} abrirDialogBorrar={abrirDialogBorrar} cerrarDialogBorrar={cerrarDialogBorrar}/>
      
      </List>
      

      {/* <Fab sx={{position: 'absolute', bottom: 20, right:20}} aria-label={'Add'} color = 'warning' size='large' onClick={()=>navigate('/nuevoParte')}>
            <AddIcon />
      </Fab> */}
      <Loading open={false} label={"Buscando datos"} ></Loading>    
    </Box>
  </div>
  )
}
