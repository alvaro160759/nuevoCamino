import React, {useEffect,useState} from 'react';
import { Appbar } from '../../components/appBar/AppBar';
import {Grid,Button,List,Box,Card, CardContent} from '@mui/material';
import Loading from '../../components/loading/loading';
import { useNavigate } from 'react-router-dom';
import { Autocompletar } from '../../components/autocomplete/Autocomplete';
import InputFecha from '../../components/datePicker/DatePicker';
import dateFormat from 'dateformat';
import useMaquinaria from '../../hooks/useMaquinaria';
import useParteMaquinaria from '../../hooks/useParteMaquinaria';
import useAuth from '../../hooks/useAuth';
import { Dialogs } from '../../components/dialog/Dialog';
import { ListaEnviados } from '../componentPage/ListaEnviados';

export const ListarPartesEnviados = () => {
    
  var usuario=JSON.parse(localStorage.getItem("usuario"))
  const url_api= import.meta.env.VITE_URL_API;
  const navigate= useNavigate();
  const { maquinarias, getMaquinarias } = useMaquinaria();
  const { parteMaquinaria, getParteMaquinariaEnviados,anularParteMaquinaria,getDetalleMaq, detalle,registrarParte,combustible,getCombustible } = useParteMaquinaria();
  const { empresa, logOut } =  useAuth();  
  const [cabecera,setCabecera]= useState();
  const [openBorrar,setOpenBorrar]=useState(false);
  const [idMquina,setIdMaquina]=useState("")
  const [idparte,setIdParte]=useState("")
  const [fechaBusqueda,setFechaBusqueda]=useState(dateFormat(new Date(),'yyyy-mm-dd'))
  const [disabled,setDisabled]=useState(false);
  const [total_min,setTotalMinutos]=useState(false);
  
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

function anularParte(){ 

  var hora2=cabecera.HORAINICIO.split(':')        
  var hora1=cabecera.HORAFINAL.split(':')
  var t1=new Date();
  var t2= new Date();
  t1.setHours(hora1[0], hora1[1]);
  t2.setHours(hora2[0], hora2[1]);
  t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())
  cabecera.TOTAL_MINUTOS=(t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : "")
  // console.log(cabecera)
  // console.log(detalle)
  // console.log(combustible)
  // return

  const formData = new FormData();
    formData.append('empresa', empresa);
    formData.append('modelo', 'Maquinaria');
    formData.append('metodo', 'anularParteMaquinaria');
    formData.append('data_out[0]', idparte);

    setDisabled(true)
    
    fetch(url_api, {
      body: formData,
      method: "POST"})
      .then(res =>res.json())
      .then(res =>{
          
        if(res.flag==true){         
          setDisabled(false)
          anularParteMaquinaria({idparte})

          
          registrarParte(
            { 
              cabecera,
              detalle,
              user:"",
              combustible,
              onSuccess : (response)=>{
                console.log(response)
                navigate('/home',{replace:true});        
              }
            });
          navigate(-1)
        }
        })
        .catch((e)=>{
          setDisabled(false)
          console.log(e)
        })

  //deleteParteMaq(idparte)
  //listarParteMaquinaria()
  //setOpenBorrar(false)
    
};


const asignarFechaBusqueda = (newValue) => {
  setFechaBusqueda(dateFormat(newValue,'yyyy-mm-dd')) 
  
}; 


const cerrarDialogBorrar = () => {
  setOpenBorrar(false);
  
};

const abrirDialogBorrar = (IDPARTEMAQ,item) => {
  setOpenBorrar(true);
  setIdParte(IDPARTEMAQ);
  setCabecera(item);
  getDetalleMaq(item.cod)
  getCombustible(item.cod)
}


  useEffect( () => {
    getMaquinarias()       
    listarParteMaquinaria();
  },[]);  
  
  return (  
    <div>    
      <Box>     
      
      <Appbar nombre={'PARTES ENVIADOS A NISIRA'} mostrarEnviar={"none"} mostrarGuardar={"none"}/>
      <Dialogs open={openBorrar} cerrar={cerrarDialogBorrar} aceptar={anularParte} mensaje={"¿Está seguro de anular parte de maquinaria?"} disabled={disabled}></Dialogs>
  
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
      
      <ListaEnviados datos={parteMaquinaria} openBorrar={openBorrar} abrirDialogBorrar={abrirDialogBorrar} cerrarDialogBorrar={cerrarDialogBorrar}/>
      
      </List>
      

      {/* <Fab sx={{position: 'absolute', bottom: 20, right:20}} aria-label={'Add'} color = 'warning' size='large' onClick={()=>navigate('/nuevoParte')}>
            <AddIcon />
      </Fab> */}
      <Loading open={false} label={"Buscando datos"} ></Loading>    
    </Box>
  </div>
  )
}
