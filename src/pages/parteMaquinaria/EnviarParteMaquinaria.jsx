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


export const EnviarParteMaquinaria = () => {


  const url_api= import.meta.env.VITE_URL_API;
  var {state}=useLocation();
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
      alert("seleccione si maquina utilizó implemento de terceros");
      return
    }
    if(detalle.length>1){
      const rango=[]
      var rango_horometro=[]
      const hora_ini=parseFloat(state.cabecera.HORAINICIO.replace(':','.')).toFixed(2)
      rango.push(hora_ini)
      rango_horometro.push(parseFloat(state.cabecera.HOROMETROINICIAL).toFixed(2))
      var fin=0;
      var fin_horometro=0
      
      detalle.map((item,i)=>{
        // console.log(state.cabecera.TOTAL_MINUTOS)
        // console.log(state.cabecera.TOTALAREA_TRAB)
        // console.log(item.AREA_TRAB)
        
        var area_percent=(item.AREA_TRAB*100)/state.cabecera.TOTALAREA_TRAB
        
        var minutos=(state.cabecera.TOTAL_MINUTOS*roundToTwo(area_percent.toFixed(3)))/100
        var minutos_item=(minutos/60)
        
        var ele=rango[i].toString();
        var hora1=ele.split('.');
        var t1=new Date();
        t1.setHours(hora1[0], hora1[1]);
        t1.setHours(t1.getHours(), t1.getMinutes()+Math.round(minutos));
        var fin_hora=(t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00");
        
        rango.push(fin_hora);
        //console.log(rango);
        detalle[i].HORAINICIO=parseFloat(rango[i]).toFixed(2);
        detalle[i].HORAFINAL=parseFloat(rango[i+1]).toFixed(2);
        var hora1=detalle[i].HORAINICIO.split('.');        
        var hora2=detalle[i].HORAFINAL.split('.');
        var t1=new Date();
        var t2= new Date();
        t2.setHours(hora1[0], hora1[1]);
        t1.setHours(hora2[0], hora2[1]);
        t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
        var horas_t1=(t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00") ; 
        detalle[i].HORAS_TRAB=minutos_item.toFixed(2);
        detalle[i].COSTO_TOTAL=(parseFloat(detalle[i].HORAS_TRAB)*parseFloat(detalle[i].COSTO_HORA)).toFixed(2);

        //-----------------------------------------------------------------------------

        
        var dif_horo=state.cabecera.HORAS_TRAB*roundToTwo(area_percent.toFixed(3))/100
        fin_horometro=parseFloat(rango_horometro[i])+parseFloat(dif_horo.toFixed(3));   
        //console.log(fin_horometro)
        rango_horometro.push(fin_horometro);
        detalle[i].HOROMETROINICIAL=parseFloat(rango_horometro[i]).toFixed(2);
        detalle[i].HOROMETROFINAL=parseFloat(rango_horometro[i+1]).toFixed(2);//+dif_horo.toFixed(2)
        detalle[i].HOROMETRO_DIFERENCIA=roundToTwo(dif_horo.toFixed(4));
        detalle[i].HORAS_TRAB1=horas_t1;

        
        })
  
    }else{
      
      detalle[0].HORAINICIO=state.cabecera.HORAINICIO.replace(':','.');
      detalle[0].HORAFINAL=state.cabecera.HORAFINAL.replace(':','.');
      detalle[0].HORAS_TRAB=state.cabecera.HORAS_TRAB;
      detalle[0].HORAS_TRAB1=state.cabecera.HORAS_TRAB1;
      detalle[0].HOROMETROINICIAL=state.cabecera.HOROMETROINICIAL;
      detalle[0].HOROMETROFINAL=state.cabecera.HOROMETROFINAL;
      detalle[0].HOROMETRO_DIFERENCIA=state.cabecera.HORAS_TRAB;
      detalle[0].COSTO_TOTAL=(parseFloat(detalle[0].HORAS_TRAB)*parseFloat(detalle[0].COSTO_HORA)).toFixed(2);

    }

    

    var cabecera= {
      IDDOCUMENTO: state.cabecera.IDDOCUMENTO,
      IDCONSUMIDORMAQUINARIA: state.cabecera.MAQUINA.ID,
      MAQUINA:state.cabecera.MAQUINA.DESCRIPCION,
      OPERARIO:state.cabecera.OPERARIO.DESCRIPCION,
      AREA:state.cabecera.AREA.DESCRIPCION,
      PROVEEDOR:state.cabecera.PROVEEDOR.DESCRIPCION,
      TURNO:state.cabecera.TURNO.DESCRIPCION,
      GLOSA: state.cabecera.GLOSA,
      IDOPERARIO: state.cabecera.OPERARIO.ID,
      HORAINICIO:state.cabecera.HORAINICIO,
      HORAFINAL:state.cabecera.HORAFINAL,
      IDACTIVIDAD:state.cabecera.ACTIVIDAD.ID,
      IDLABOR:state.cabecera.LABOR.ID,
      HOROMETROINICIAL:state.cabecera.HOROMETROINICIAL,
      HOROMETROFINAL:state.cabecera.HOROMETROFINAL,
      HORAS_TRAB:state.cabecera.HORAS_TRAB,
      HORAS_TRAB1:state.cabecera.HORAS_TRAB1,
      IDTURNOTRABAJO: state.cabecera.TURNO.ID,
      TOTAL_COSTO: state.cabecera.TOTAL_COSTO,
      TOTALAREA_TRAB: state.cabecera.TOTALAREA_TRAB,
      FORMAPAGO: state.cabecera.FORMAPAGO,
      IDAREA: state.cabecera.AREA.ID,
      COSTO_HORA:state.cabecera.COSTO_HORA, 
      IDCLIEPROV:state.cabecera.PROVEEDOR.ID,
      IDUSUARIO:state.cabecera.IDUSUARIO,
      FECHA:state.cabecera.FECHA
    };

    detalle.map((item,i)=>{
      
      detalle[i].IDCONSUMIDOR=item.CONSUMIDOR.ID;
      detalle[i].DESCRIPCION= item.CONSUMIDOR.DESCRIPCION;
      detalle[i].AREA_TRAB= item.AREA_TRAB;
      detalle[i].HORAINICIO=item.HORAINICIO;
      detalle[i].HORAFINAL=item.HORAFINAL;
      detalle[i].HOROMETROINICIAL=item.HOROMETROINICIAL;
      detalle[i].HOROMETROFINAL=item.HOROMETROFINAL;
      detalle[i].HORAS_TRAB=item.HORAS_TRAB;
      detalle[i].HORAS_TRAB1=item.HORAS_TRAB1;
      detalle[i].COSTO_HORA= item.COSTO_HORA;
      detalle[i].IDACTIVIDAD= item.ACTIVIDAD.ID;
      detalle[i].IDLABOR= item.LABOR.ID;
      detalle[i].DSC_LABOR= item.LABOR.DESCRIPCION;
      detalle[i].HOROMETRO_DIFERENCIA=item.HOROMETRO_DIFERENCIA;
      detalle[i].COSTO_TOTAL=item.COSTO_TOTAL;
      detalle[i].IDJIRON= item.JIRON.ID;
      detalle[i].DESCJIRON=item.JIRON.DESCRIPCION;
      detalle[i].IDCUARTEL= item.CUARTEL.ID;
      detalle[i].DESCCUARTEL=item.CUARTEL.DESCRIPCION;
  })

  // console.log(detalle);
  // return

    const formData = new FormData();
    formData.append('empresa', empresa);
    formData.append('modelo', 'Maquinaria');
    formData.append('metodo', 'cerrarParteMaquinaria');
    formData.append('data_out[0]', JSON.stringify(cabecera));
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
          //console.log(res);          
          setDisabled(false)
          updateParteMaq(state.cabecera.cod,res.data)
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
    formData.append('empresa', empresa);
    formData.append('modelo', 'Maquinaria');
    formData.append('metodo', 'listarResponsable');

    fetch(url_api, {
      body: formData,
      method: "POST"})
      .then(res =>res.json())
      .then(res =>{
        //console.log(res)
          setResponsables(res)
        })
        .catch((e)=>{
          console.log(e)
        })

  };

  const cambiarResponsable = (event, newValue) => {

    if(event!=null){
      //console.log(event.ID)
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

  function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
  
  useEffect( () => {   
    getDParteMap()    
    listarResponsables()
  },[]);
  
  return (  
    <Box>
      <Box>      
        <Appbar 
          nombre={state.cabecera.ESTADO=='P'?state.cabecera.IDDOCUMENTO==='PMA'?" Cerrar Parte de Maquinaria Alquilada":"Cerrar Parte de Maquinaria Propia":"PARTE DE MAQUINARIA " } 
          mostrarSalir={'none'} 
          mostrarGuardar={'none'}
          mostrarEnviar={state.cabecera.ESTADO=='P'?'':"none"}
          enviar={abrirDialogEnviar}
        /> 
        <Dialogs 
          open={openEnviar} 
          cerrar={cerrarDialogEnviar} 
          aceptar={enviarDatos} 
          mensaje={"Ingrese los siguientes datos para guardar"} 
          disabled={disabled}
          flag={true}
          responsbles={responsbles}
          cambiarResponsable={cambiarResponsable}
          cambiarImplemento={cambiarImplemento}
          implemento={implemento}
        />                
        
          <CabeceraEditarParteMaquinaria 
            cabecera={state.cabecera}   
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
