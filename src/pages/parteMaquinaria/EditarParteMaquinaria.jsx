import React, {useEffect,useState} from 'react';
import { useLocation, useNavigate ,useParams} from "react-router-dom";
import { Appbar } from '../../components/appBar/AppBar';
import { Detalle } from '../componentPage/DetalleParteMaquinaria';
import { CabeceraEditarParteMaquinaria } from '../componentPage/CabeceraEditarParteMaquinaria';
import { List,Tab } from '@mui/material';
import { Config } from '../../../config';
import { Box } from '@mui/system';
import { Dialogs } from '../../components/dialog/Dialog';
import useParteMaquinaria from '../../hooks/useParteMaquinaria';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { DetalleCombustible } from '../componentPage/DetalleCombustible';


export const EditarParteMaquinaria = () => {

  const url_api= import.meta.env.VITE_URL_API;
  var {state:data}=useLocation();
  let { id } = useParams();
  const  navigate=useNavigate();  
  const empresa=localStorage.getItem("empresa").toString();
  const { updateParteMaq } = useParteMaquinaria();
  const { detalle,getDetalleMaq,combustible,getCombustible } = useParteMaquinaria();
  const [openEnviar,setOpenEnviar]=useState(false);
  const [disabled,setDisabled]=useState(true);
  const [value, setValue] = useState('1');
  const [responsbles, setResponsables] = useState([]);
  const [implemento, setIdImplemento] = useState('');
  const [idResponsable, setIdResponsable] = useState();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const getDParteMap = ()=>{
  
  getDetalleMaq(id)
  getCombustible(id)
  
}  

  const abrirDialogEnviar = () => {
    setOpenEnviar(true);
  };  

  const cerrarDialogEnviar = () => {
    setOpenEnviar(false);
  };  

  const enviarDatos = () => {

    if(implemento==""){
      alert("seleccione opcion de implemento de terceros");
      return
    }
    console.log("enviando datos")
    console.log(data.cabecera)    
    console.log(detalle)
    console.log(combustible)
    
    const formData = new FormData();
    formData.append('empresa', empresa);
    formData.append('modelo', 'Maquinaria');
    formData.append('metodo', 'cerrarParteMaquinaria');
    formData.append('data_out[0]', JSON.stringify(data.cabecera));
    formData.append('data_out[1]', JSON.stringify(detalle));
    formData.append('data_out[2]', JSON.stringify(combustible));
    formData.append('data_out[3]', JSON.stringify(idResponsable));
    formData.append('data_out[4]', JSON.stringify(implemento));

    setDisabled(true)
    
    fetch(url_api, {
      body: formData,
      method: "POST"})
      .then(res =>res.json())
      .then(res =>{
        if(res.flag==true){
          setDisabled(false)
          updateParteMaq(data.cabecera.cod)
          navigate(-1)
        }
        })
        .catch((e)=>{
          setDisabled(false)
          console.log(e)
        })

  };

  const listarResponsables = () => {
    
    const formData = new FormData();
    formData.append('empresa', '002');
    formData.append('modelo', 'Maquinaria');
    formData.append('metodo', 'listarResponsable');

    fetch(url_api, {
      body: formData,
      method: "POST"})
      .then(res =>res.json())
      .then(res =>{
        console.log(res)
          setResponsables(res)
        })
        .catch((e)=>{
          console.log(e)
        })

  };


  const cambiarResponsable = (event, newValue) => {

    if(event!=null){
      console.log(event.ID)
      setIdResponsable(event.ID)
      setDisabled(false)
    }else{
      setDisabled(true)
    }
    
  };

  const cambiarImplemento= (event) => {
    console.log(event.target.value)
    if(event!=null){
      setIdImplemento(event.target.value)
    }
    
  };
  

  useEffect( () => {    
    getDParteMap()    
    listarResponsables()
  },[]);
  
  return (  
    <Box>
      <Box>      
        <Appbar 
          nombre={data.cabecera.IDDOCUMENTO==='PMA'?" Cerrar Parte de Maquinaria Alquilada":"Cerrar Parte de Maquinaria Propia"} 
          mostrarSalir={'none'} 
          mostrarGuardar={'none'} 
          enviar={abrirDialogEnviar}
        /> 
        <Dialogs 
          open={openEnviar} 
          cerrar={cerrarDialogEnviar} 
          aceptar={enviarDatos} 
          mensaje={"Seleccione responsable para guardar"} 
          disabled={disabled}
          responsbles={responsbles}
          cambiarResponsable={cambiarResponsable}
          cambiarImplemento={cambiarImplemento}
          implemento={implemento}
        />                
        
          <CabeceraEditarParteMaquinaria 
            cabecera={data.cabecera}   
          />  
        
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' ,marginTop:2}} >
            <TabList 
              onChange={handleChange} 
              aria-label="lab API tabs example" 
              variant='fullWidth'
              textColor="inherit"
              sx={{background:'#ed6c02', color:'white'}}
              TabIndicatorProps={{style: {backgroundColor: "#ffff"}}}
            >
              <Tab label="Detalle" value="1" />
              <Tab label="Combustible" value="2"/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <List
              sx={{
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 400,                
              }}
              subheader={<li />}
            >
            <Detalle detalle={detalle}></Detalle>
            </List>
          </TabPanel>
          <TabPanel value="2">
          <List
              sx={{
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 400,                
              }}
              subheader={<li />}
            >
            <DetalleCombustible combustible={combustible}></DetalleCombustible>
            </List>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
      
  )
}
