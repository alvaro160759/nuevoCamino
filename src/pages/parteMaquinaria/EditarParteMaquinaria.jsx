import React, {useEffect,useState} from 'react';
import { Appbar } from '../../components/appBar/AppBar';
import { Detalle } from '../componentPage/DetalleParteMaquinaria';
import { CabeceraParteMaquinaria } from '../componentPage/CabeceraNuevoParteMaquinaria';
import { Fab,  List,  Tab } from '@mui/material';
import { Box } from '@mui/system';
import { FormularioModal } from '../../components/modal/FormularioModal';
import { FormularioModalEditar } from '../../components/modal/FormularioModalEditar';
import {Interruptor} from '../../components/switch/Switch';
import { Dialogs } from '../../components/dialog/Dialog';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import useAreas from '../../hooks/useAreas';
import useMaquinaria from '../../hooks/useMaquinaria';
import useProveedores from '../../hooks/useProveedores';
import useOperario from '../../hooks/useOperario';
import useActividad from '../../hooks/useActividad';
import useLabores from '../../hooks/useLabores';
import useParteMaquinaria from '../../hooks/useParteMaquinaria';
import useTurnoTrabajo from '../../hooks/useTurnoTrabajo';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { ModalCombustible } from '../../components/modal/ModalCombustible';
import { DetalleCombustible } from '../componentPage/DetalleCombustible';
import { ModalCombustibleEditar } from '../../components/modal/ModalCombustibleEditar';
import useConsumidores from '../../hooks/useConsumidores';
import useJirones from '../../hooks/useJirones';
import useCuartel from '../../hooks/useCuartel';

const formaPago = [
  {ID: 'HR', DESCRIPCION: 'POR HORA'},
  {ID: 'HA', DESCRIPCION: 'POR HECTAREA'},
];

export const EditarParteMaquinaria = () => {

  var {state}=useLocation();
  var cod= useParams();
  const  navigate=useNavigate();
  const {usuario}=JSON.parse(localStorage.getItem("usuario"))
  
  //FLAGS
  const [horas_min,setHoras_min]=useState(0)
  const [openModal, setOpenModal] = useState(false);
  const [openModalCombustible, setOpenModalCombustible] = useState(false);
  const [editar, setEditar] = useState(false)
  const [openModalEditarCombustible, setOpenModalEditarCombustible] = useState(false)
  const [openDialog,setOpenDilog]= useState(false)
  const [switchChecked,setSwitch]=useState(true);
  const [openGuardar,setOpenGuardar]=useState(false);
  const [openBorrar,setOpenBorrar]=useState(false);
  const [mensajeDialog,setMensajeDialog]=useState("");
  const [bloquearGuardar,setBloquearGuardar]=useState(false);
  const [tab, setTab] = useState('1');
  
  //HOOKS
  const { registrarParte,getDetalleMaq,detalle,setDetalle,updateParte,getAllPartes } = useParteMaquinaria();
  const { turnostrabajo, getTurnosTrabajo,turno,setTurno } = useTurnoTrabajo();
  const { areas, getAreas,area,setArea } = useAreas();
  const { maquinarias, getMaquinarias,maquina,getMaquinaById,cambiarMaquina,costoHora } = useMaquinaria();
  const { proveedores, getProveedores,proveedor,getProveedorById, cambiarProveedor } = useProveedores();
  const { operarios, getOperarios,operador,getOperarioById,cambiarOperario } = useOperario();
  const { actividades, getActividades,actividad,getActividadById,setActividad } = useActividad();
  const { labores, getLabores,labor,setLabor,getLaborById,cambiarLabor } = useLabores();
  const { consumidor,setConsumidor,getConsumidorById,cambiarConsumidor} = useConsumidores();
  const { jiron,setJiron,getJironById,cambiarJiron} = useJirones();
  const { cuartel,setCuartel,getCuartelById,cambiarCuartel} = useCuartel();

  useEffect( () => { 

    if(parseFloat(cod.id)!=0){
    console.log(state?.cabecera)
    getMaquinaById(state?.cabecera.MAQUINA.ID);
    getProveedorById(state?.cabecera.PROVEEDOR.ID);
    getOperarioById(state?.cabecera.OPERARIO.ID);    
    getActividadById(state?.cabecera.ACTIVIDAD.ID);
    getLabores(state?.cabecera.ACTIVIDAD.ID)
    getLaborById(state?.cabecera.LABOR.ID);
    getDetalleMaq(cod.id)
    setArea(state?.cabecera.AREA)
    setTurno(state?.cabecera.TURNO)
    }
    
    getTurnosTrabajo();
    getAreas();
    getMaquinarias();
    getOperarios();
    getActividades();  
    getProveedores(); 
  },[]);
  
  //VARIABLES
  const [tipoParte,setTipoParte]=useState(state?state?.cabecera.IDDOCUMENTO:"PMA");  
  const [idFormaPago,setIdFormaPago]=useState(state?state?.cabecera.FORMAPAGO:'HR');
  const [fecha, setFecha] = useState(state?state?.cabecera.FECHA:dateFormat(new Date(),'yyyy-mm-dd'));
  const [HoraInicio,setHoraInicio]=useState(state?state?.cabecera.HORAINICIO:""); // hora Inicio
  const [HoraFin,setHoraFin]=useState(state?state?.cabecera.HORAFINAL:""); // hora fin
  const [horometroInicio,setHorometroInicio]=useState(state?state?.cabecera.HOROMETROINICIAL:""); // horometro inicial
  const [horometroFin,setHorometroFin]=useState(state?state?.cabecera.HOROMETROFINAL:"");// horometro final
  const [horas_trabCabecera,setHoras_trabCabecera]=useState(state?state?.cabecera.HORAS_TRAB:0); // diferencia horometro
  const [horas_trab1_cabecera,setHoras_trab1_cabecera]=useState(state?state?.cabecera.HORAS_TRAB1:0);// diferencia horas reloj 
  const [totalAreaTrabajada,setTotalAreaTrabajada]=useState(state?state?.cabecera.TOTALAREA_TRAB:0); 
  const [glosa, setGlosa] = useState(state?state?.cabecera.GLOSA:"");  
  const [costoTotal,setCostoTotal]=useState(0);
  const [areaTrabajada,setAreaTrabajada]=useState("");  
  const [totalCostoCabecera,setTotalCostoCabecera]=useState(0);
  const [index,setIndex]=useState("");
  
  //VARIABLES COMBUSTIBLE
  const [combustible, setCombustible] = useState([]);
  const [idCombustible, setIdCombustible] = useState("");
  const [descCombustible, setDescCombustible] = useState("");
  const [idMedidaCom, setIdMedidaCom] = useState("");
  const [cantCombustible, setCantCombustible] = useState("");
  const [indexCombustible, setIndexCombustible] = useState("");

  const cambiarTab = (event, newValue) => {
    setTab(newValue);
  }; 

  const cerrarDialog = () => {
    setOpenDilog(false);
  };

  const cambiarActividad = (newValue) => { 
    if(newValue!=null){
      console.log(newValue.ID)
      setActividad(newValue) 
      getLabores(newValue.ID)
      setLabor("")  
    }else{
      setActividad("");
    }
  }; 
  
  const cambiarSwitch=(event)=>{
    if(event.target.checked===true){
      setSwitch(true)
      setTipoParte('PMA')
    }else{
      setTipoParte('PMQ')
      setSwitch(false)
    }
  }

  const cambiarHorometroFin = (event) => {
    if(horometroInicio!=""){
        setHorometroFin(event.target.value)
        var dif_horo=parseFloat(event.target.value)-parseFloat(horometroInicio)
        if(parseFloat(dif_horo)>0){
        setHoras_trabCabecera(dif_horo.toFixed(2))
        }else{
          setHoras_trabCabecera(0)
        }      
    }else{
      setHorometroFin("")
      setDifHorometro(0)
    }
  };

  const cambiarHorometroInicio = (event) => {
    if(event.target.value!=""){
      setHorometroInicio(event.target.value)
      if(horometroFin<=event.target.value && horometroFin!="" ){
        setHorometroInicio(""); 
        setHoras_trabCabecera(0);    
        alert("Horometro Inicio no puede ser mayor o igual a Horometro fin")
      }else{  
        if(parseFloat(horometroFin)>0){
          var dif_horo=parseFloat(horometroFin)-parseFloat(event.target.value)
          setHoras_trabCabecera(dif_horo.toFixed(2))
        }
      }
    }else
      setHorometroInicio("")     
  };

  const cambiarAreaTrabajada = (event) => {
    if(event.target.value!=null){
      console.log(event.target.value)
      setAreaTrabajada(event.target.value)

      if(idFormaPago==='HA'){
        var total_costo=event.target.value*costoHora
        setCostoTotal(total_costo.toFixed(2))
        console.log(event.target.value*costoHora)
      }
    }
    
  };

  const cambiarCantidad = (event) => {
    if(event.target.value!=null){
      console.log(event.target.value)
      setCantCombustible(event.target.value)
    }    
  };

  const cambiarHoraInicio = (event) => {    
    if(event.target.value !=""){
      if(HoraFin<event.target.value && HoraFin!="" ){
        setHoraInicio(""); 
        setHoras_trab1_cabecera(0);    
        alert("Hora Inicio no puede ser mayor a hora fin")
      }else{       
        setHoraInicio(event.target.value)
        if(idFormaPago==='HR'){
          var hora1=HoraFin.split(':')        
          var hora2=event.target.value.split(':')
          var t1=new Date();
          var t2= new Date();
          t1.setHours(hora1[0], hora1[1]);
          t2.setHours(hora2[0], hora2[1]);
          t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())          
          setHoras_trab1_cabecera((t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00"))
          setHoras_min((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))          
          console.log((t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00"))
        }       
      }
    }else{
      setHoraInicio('')
    } 
  }; 

  const cambiarHoraFin = (event) => {
    if(HoraInicio!=""){
      if(HoraInicio<event.target.value){
        setHoraFin(event.target.value)
        if(idFormaPago==='HR'){
          var hora2=HoraInicio.split(':')        
          var hora1=event.target.value.split(':')
          var t1=new Date();
          var t2= new Date();
          t1.setHours(hora1[0], hora1[1]);
          t2.setHours(hora2[0], hora2[1]);
          t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())          
          setHoras_trab1_cabecera((t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00"))
          setHoras_min((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))          
          console.log((t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00"))
        }       
      }else{
        setHoraFin('')
        if(idFormaPago==='HR'){
          setHoras_trab1_cabecera(0)
        }        
        alert('Hora fin no puede ser menor a hora de inicio')
      }
    }else{
      setHoraFin('')
      alert('Seleccione hora inicio primero')
    }
  }; 

  const cambiarGlosa = (event) => {
    if(event.target.value!=null){
      setGlosa(event.target.value)
    }
  }; 

  const cambiarArea = (event,newValue) => {    
    var area={ID:newValue.props.value,DESCRIPCION:newValue.props.name}
    setArea(area);
  };

  const cambiarTurno = (event,newValue) => {    
    var turno_trabajo={ID:newValue.props.value,DESCRIPCION:newValue.props.name}
    setTurno(turno_trabajo);    
  };

  const cambiarFormaPago = (event) => {
    console.log(totalAreaTrabajada)
    setIdFormaPago(event.target.value);
    if(event.target.value==='HR'){
          var hora2=HoraInicio.split(':')        
          var hora1=HoraFin.split(':')
          var t1=new Date();
          var t2= new Date();
          t1.setHours(hora1[0], hora1[1]);
          t2.setHours(hora2[0], hora2[1]);
          t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())
          setHoras_trab1_cabecera((t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00"))
          setHoras_min((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
          console.log((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
    }else{        
        var hora2=HoraInicio.split(':')        
        var hora1=HoraFin.split(':')
        var t1=new Date();
        var t2= new Date();
        t1.setHours(hora1[0], hora1[1]);
        t2.setHours(hora2[0], hora2[1]);
        t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())
        setHoras_trab1_cabecera(totalAreaTrabajada)
        setHoras_min((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
        console.log((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
    }
    
  };
  
const OpenModal = (flag) => {
  
  setConsumidor("") 
  setJiron("")
  setCuartel("")
  flag==false?setAreaTrabajada(""):"";
  setOpenModal(true);
};

const CloseModal = () => {
  setOpenModal(false);
  setEditar(false);
};

const OpenModalCombustible = () => {
  setIdCombustible("");
  setCantCombustible("");
  setOpenModalCombustible(true);
};

const CloseModalCombustible = () => {
  setOpenModalCombustible(false);
};

const OpenModalEditar = () => {
  setOpenModalEditar(true);
};

const CloseModalEditar = () => {
  setOpenModalEditar(false);
};

const OpenModalEditarCombustible = () => {
  setOpenModalEditarCombustible(true);
};

const CloseModalEditarCombustible = () => {
  setOpenModalEditarCombustible(false);
};

const guardarItem=()=>{
  
  if(consumidor==""){
    setMensajeDialog("Ingrese un consumidor para continuar")
    setOpenDilog(true)
    return
  } 

  if(jiron=="" && tipoParte=='PMA'){
    setMensajeDialog("Ingrese un lote para continuar")
    setOpenDilog(true)
    return
  } 

  if(cuartel=="" && tipoParte=='PMA'){
    setMensajeDialog("Ingrese un valvula para continuar")
    setOpenDilog(true)
    return
  }

  if(areaTrabajada=="" && tipoParte=='PMA'){
    setMensajeDialog("Ingrese el area para continuar")
    setOpenDilog(true)
    return
  }

  if(labor==""){
    setMensajeDialog("Ingrese una labor para continuar")
    setOpenDilog(true)
    return
  } 

  var item= new Object({

    ACTIVIDAD: actividad,
    LABOR: labor,
    CONSUMIDOR:consumidor,
    AREA_TRAB: areaTrabajada!=''?areaTrabajada:0,
    HORAINICIO:HoraInicio,
    HORAFINAL:HoraFin,
    HOROMETROINICIAL:horometroInicio,
    HOROMETROFINAL:horometroFin,
    HORAS_TRAB:horas_trabCabecera,
    HORAS_TRAB1:horas_trab1_cabecera,
    COSTO_HORA: costoHora,
    HOROMETRO_DIFERENCIA:horas_trab1_cabecera,
    COSTO_TOTAL:costoTotal,
    JIRON: jiron,
    CUARTEL: cuartel
  })
  detalle.push(item)
  if(idFormaPago=='HR'){
    var total_area=areaTrabajada!=""?parseFloat(totalAreaTrabajada)+parseFloat(areaTrabajada):0
    var total_costo=parseFloat(costoHora)*parseFloat(horas_trab1_cabecera)
    setTotalCostoCabecera(total_costo.toFixed(2))
    setTotalAreaTrabajada(total_area.toFixed(2))
    console.log(total_area);
  }else{
    var total_area=areaTrabajada!=""?parseFloat(totalAreaTrabajada)+parseFloat(areaTrabajada):0
    var suma=parseFloat(horas_trab1_cabecera)+parseFloat(areaTrabajada)
    var suma_totalCosto=parseFloat(horas_trab1_cabecera)*parseFloat(costoHora)
    setHoras_trab1_cabecera(suma.toFixed(2))//CANTIDAD DE HR/HA
    setTotalCostoCabecera(suma_totalCosto.toFixed(2))
    setTotalAreaTrabajada(total_area.toFixed(2))

    console.log(total_area)
  }  

  var hora2=HoraInicio.split(':');      
  var hora1=HoraFin.split(':');
  var t1=new Date();
  var t2= new Date();
  t1.setHours(hora1[0], hora1[1]);
  t2.setHours(hora2[0], hora2[1]);
  t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())
  setHoras_min((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
  console.log((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
  CloseModal()

}

const EditarItem=()=>{

  detalle.map((item,i)=>{
      detalle[index].AREA_TRAB=areaTrabajada
      detalle[index].CONSUMIDOR=consumidor
      detalle[index].JIRON=jiron
      detalle[index].CUARTEL=cuartel

      if(formaPago==='HA'){
        detalle[index].COSTO_TOTAL=(areaTrabajada*detalle[index].COSTO_HORA).toFixed(2)
      }      
  })

  let suma = detalle.reduce((acumulador, actual) => parseFloat(acumulador) + parseFloat(actual.AREA_TRAB), 0);
  
  if(idFormaPago=='HA'){
    setHoras_trab1_cabecera(suma.toFixed(2))
  }
  setTotalAreaTrabajada(suma.toFixed(2))
  CloseModal()

}

const editarCombustible=()=>{
  
  combustible[indexCombustible].CANTIDAD=cantCombustible   
  console.log(combustible)
  CloseModalEditarCombustible()

}

//GUARDA EL PARTE DE MAQUINARIA INTERNAMENTE
 const editarparte =()=>{

  if(maquina==""){
    setMensajeDialog("Seleccione una maquina para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(proveedor=="" && tipoParte=='PMA'){
    
    setMensajeDialog("Ingrese un proveedor para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(operador==""){
    setMensajeDialog("Seleccione un operario para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(actividad==""){
    setMensajeDialog("Seleccione una actividad para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(labor==""){
    setMensajeDialog("Seleccione una labor para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(HoraInicio==""){
    setMensajeDialog("Ingrese la hora de Inicio para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(HoraFin==""){
    setMensajeDialog("Ingrese la hora de Fin para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(horometroInicio=="" ){
    setMensajeDialog("Ingrese horometro inicio para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(horometroFin=="" || horas_trabCabecera==0){
    setMensajeDialog("Diferencia de Horometro es 0, verificar Horometro final")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(detalle.length==0){
    setMensajeDialog("Ingrese almenos un item en el detalle para guardar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
   }

  var cabecera= {
    IDDOCUMENTO: tipoParte,
    MAQUINA:maquina,
    OPERARIO:operador,
    AREA:area,
    ACTIVIDAD:actividad,
    LABOR:labor,
    PROVEEDOR:proveedor,
    TURNO:turno,
    GLOSA: glosa,
    HORAINICIO:HoraInicio,
    HORAFINAL:HoraFin,
    HOROMETROINICIAL:horometroInicio,
    HOROMETROFINAL:horometroFin,
    HORAS_TRAB:horas_trabCabecera,
    HORAS_TRAB1:horas_trab1_cabecera,    
    TOTAL_COSTO: totalCostoCabecera,
    TOTAL_MINUTOS: horas_min,
    TOTALAREA_TRAB: totalAreaTrabajada,
    FORMAPAGO: idFormaPago,    
    COSTO_HORA:costoHora,
    IDUSUARIO:usuario,
    FECHA:fecha
  }

  if(cod.id!=0){

    detalle.map(item=>{
      item.ACTIVIDAD=actividad;
      item.LABOR=labor;
    });

    //  console.log(totalAreaTrabajada)
    //  console.log("editar parte")
    //  console.log(cabecera)
    //  console.log(detalle)
    
     updateParte({
        id:cod.id,
        cabecera,
        detalle,
        onSuccess : (response)=>{
          console.log(response)
          navigate('/home',{replace:true});        
        }
     });
  }else{

    
    registrarParte(
      { 
        cabecera,
        detalle,
        user:usuario.usuario,
        combustible,
        onSuccess : (response)=>{
          console.log(response)
          navigate('/home',{replace:true});        
        }
      }); 
  }
  
 }  

  const abrirDialogGuardar = () => {

    setOpenGuardar(true);
  }; 
   
  const cerrarDialogGuardar = () => {
    setOpenGuardar(false);
  };

  const itemSeleccionado=(item,i)=>{
    setEditar(true)
    getConsumidorById(item.CONSUMIDOR.ID);
    getCuartelById(item.CUARTEL.ID);
    getJironById(item.JIRON.ID);
    setAreaTrabajada(item.AREA_TRAB);
    setIndex(i)
    OpenModal(true)
  }

  const itemSelectCombustible=(item,i)=>{
    console.log(item)
    setIndexCombustible(i)
    setIdCombustible(item.IDCOMBUSTIBLE)
    setDescCombustible(item.DESCRIPCION)
    setCantCombustible(item.CANTIDAD)
    OpenModalEditarCombustible()
  }

  const asignarFecha = (newValue) => {
    console.log(dateFormat(newValue,'yyyy-mm-dd'))
    setFecha(dateFormat(newValue,'yyyy-mm-dd'))     
  }; 

  const cerrarDialogBorrar = () => {
    setOpenBorrar(false);
    
  };

  const abrirDialogBorrar = () => {
    setOpenBorrar(true);
  }

  const borrarItem = () => {
    console.log(index)
    var filter=detalle.filter((item,i)=>{
      return detalle[i]!==detalle[index]
    })
    setDetalle(filter)
    let suma = filter.reduce((acumulador, actual) => parseFloat(acumulador) + parseFloat(actual.AREA_TRAB), 0);
    if(idFormaPago=='HA'){
      setHoras_trab1_cabecera(suma.toFixed(2))
    } 
    var hora2=HoraInicio.split(':')        
    var hora1=HoraFin.split(':')
    var t1=new Date();
    var t2= new Date();
    t1.setHours(hora1[0], hora1[1]);
    t2.setHours(hora2[0], hora2[1]);
    t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())
    setHoras_min((t1.getHours() ? t1.getHours()*60: "0") + (t1.getMinutes() ? +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ""))
    setTotalAreaTrabajada(suma.toFixed(2))
    setOpenBorrar(false)
    CloseModal()
  }

  const cambiarCombustible= (newValue) => {
    console.log(newValue)
    if(newValue!=null){
      console.log(newValue.ID)
      setIdCombustible(newValue.ID)
      setDescCombustible(newValue.DESCRIPCION)
      setIdMedidaCom(newValue.IDMEDIDA)
    }else{
      setIdCombustible("");
      setDescCombustible("");
      setIdMedidaCom("");
    }
  };

  const guardarCombustible=()=>{
  
    if(idCombustible==""){
      setMensajeDialog("Falta seleccionar Combustible")
      setOpenDilog(true)
      return
    } 
  
    if(cantCombustible==""){
      setMensajeDialog("Ingrese la cantidad de combustible")
      setOpenDilog(true)
      return
    } 
  
    
  
    var data= new Object({
      IDCOMBUSTIBLE:idCombustible.trim(),
      DESCRIPCION:descCombustible,
      IDMEDIDA:idMedidaCom.trim(),
      CANTIDAD:cantCombustible,
      
  
    })
    console.log(data)
    combustible.push(data)
    CloseModalCombustible()
    console.log(combustible)
  
  } 
  
  return (  
    <div>
        <div>
        <Appbar nombre={cod.id!=0?"Edición de Parte de Maquinaria":"Nuevo Parte de Maquinaria"} mostrarSalir={'none'} mostrarEnviar={"none"} guardar={abrirDialogGuardar}></Appbar> 
        <Dialogs open={openGuardar} cerrar={cerrarDialogGuardar} aceptar={editarparte} mensaje={"¿Está seguro de guardar los datos?"} esconder={'none'} flag={false}></Dialogs>
        <Dialogs open={openDialog} cerrar={cerrarDialog} aceptar={cerrarDialog} mensaje={mensajeDialog} esconder={'none'}></Dialogs>      
        <Dialogs open={openBorrar} cerrar={cerrarDialogBorrar} aceptar={borrarItem} mensaje={"¿Está seguro de borrar item?"} esconder={'none'}></Dialogs>    
        <Interruptor cambiarSwitch={cambiarSwitch} switchChecked={switchChecked}></Interruptor>
        <Box>
          <CabeceraParteMaquinaria
          codigo={cod.id}
          areas={areas} 
          idArea={area.ID}
          cambiarArea={cambiarArea}
          turnos={turnostrabajo}   
          idTurno={turno.ID}
          cambiarTurno={cambiarTurno}
          maquinarias={maquinarias}
          maquina={maquina}
          cambiarMaquina={cambiarMaquina}
          proveedores={proveedores}
          proveedor={proveedor}
          cambiarProveedor={cambiarProveedor}
          actividades={actividades}          
          actividad={actividad}
          cambiarActividad={cambiarActividad}
          labores={labores}
          cambiarLabor={cambiarLabor}
          labor={labor}
          formaPago={formaPago}
          idFormaPago={idFormaPago}
          cambiarFormaPago={cambiarFormaPago}
          operarios={operarios}
          operador={operador}
          cambiarOperario={cambiarOperario}  
          horas_trabCabecera={horas_trabCabecera} 
          horas_trab1_cabecera={horas_trab1_cabecera}
          tipoParte={tipoParte}    
          cambiarHoraInicio={cambiarHoraInicio}
          cambiarHoraFin={cambiarHoraFin}
          horaFin={HoraFin}   
          horaInicio={HoraInicio} 
          cambiarHorometroInicio={cambiarHorometroInicio}
          horometroInicio={horometroInicio}
          horometroFin={horometroFin}
          cambiarHorometroFin={cambiarHorometroFin}
          asignarFecha={asignarFecha}
          fecha={fecha}
          cambiarConsumidor={cambiarConsumidor} 
          inputGlosa={cambiarGlosa}
          glosa={glosa}

          />
        </Box>
        <p></p>
        <Box>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' ,marginTop:2}} >
            <TabList 
              onChange={cambiarTab} 
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
                maxHeight: 200,                
              }}
              subheader={<li />}
            >
            <Detalle detalle={detalle} itemSeleccionado={itemSeleccionado}></Detalle>
            </List>
            
              <Fab sx={{position: 'absolute', bottom: 20, right:20}} aria-label={'Add_detalle'} color = 'success' size='large'  onClick={()=>OpenModal(false)}>
                <SignpostIcon/>
              </Fab>  
            
          </TabPanel>
          <TabPanel value="2">
          <List
              sx={{
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 200,                
              }}
              subheader={<li />}
            >
            <DetalleCombustible combustible={combustible} itemSeleccionado={itemSelectCombustible}></DetalleCombustible>
            </List>
            <Fab sx={{position: 'absolute', bottom: 20, right:20}}  color = 'success'   onClick={OpenModalCombustible}>
              <LocalGasStationIcon/>
            </Fab> 
          </TabPanel>
        </TabContext>
      
          <FormularioModal 
            open={openModal} 
            editar={editar}
            handleCloseModal={CloseModal}
            consumidor={consumidor}
            cambiarConsumidor={cambiarConsumidor} 
            jiron={jiron} 
            cambiarJiron={cambiarJiron}
            cuartel={cuartel}
            cambiarCuartel={cambiarCuartel}
            areaItem={areaTrabajada}
            cambiarAreaTrabajada={cambiarAreaTrabajada}
            guardar={editar!=false?EditarItem:guardarItem}
            dialogBorrar={abrirDialogBorrar}
          />

         <ModalCombustible
            open={openModalCombustible} 
            CloseModal={CloseModalCombustible}
            cambiarCombustible={cambiarCombustible}  
            cambiarCantidad={cambiarCantidad}
            guardar={guardarCombustible}
          />

          <ModalCombustibleEditar
            open={openModalEditarCombustible} 
            CloseModal={CloseModalEditarCombustible}
            idCombustible={idCombustible}
            descripcion={descCombustible}
            cantCombustible={cantCombustible}
            cambiarCantidad={cambiarCantidad}
            editar={editarCombustible}
          />
          
          
        </Box>
                     
      </div> 
    </div>
      
  )
}
