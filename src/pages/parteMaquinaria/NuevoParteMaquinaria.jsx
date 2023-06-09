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
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import useAreas from '../../hooks/useAreas';
import useMaquinaria from '../../hooks/useMaquinaria';
import useProveedores from '../../hooks/useProveedores';
import useOperario from '../../hooks/useOperario';
import useActividad from '../../hooks/useActividad';
import useLabores from '../../hooks/useLabores';
import useParteMaquinaria from '../../hooks/useParteMaquinaria';
import useTurnoTrabajo from '../../hooks/useTurnoTrabajo';
import useImplemento from '../../hooks/useImplemento';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { ModalCombustible } from '../../components/modal/ModalCombustible';
import { DetalleCombustible } from '../componentPage/DetalleCombustible';
import { ModalCombustibleEditar } from '../../components/modal/ModalCombustibleEditar';



export const NuevoParteMaquinaria = () => {

  
  const [horas_min,setHoras_min]=useState(0)
  var usuario=JSON.parse(localStorage.getItem("usuario"))
  var idUsuario=usuario.IDUSUARIO;
  var user =usuario.usuario;
  const  navigate=useNavigate();
  
  const formaPago = [
    {ID: 'HR', DESCRIPCION: 'POR HORA'},
    {ID: 'HA', DESCRIPCION: 'POR HECTAREA'},
    //{ID: 'DI', DESCRIPCION: 'POR DIA'}
  ];

  const { registrarParte } = useParteMaquinaria();
  const { turnostrabajo, getTurnosTrabajo } = useTurnoTrabajo();
  const { areas, getAreas } = useAreas();
  const { maquinarias, getMaquinarias } = useMaquinaria();
  const { proveedores, getProveedores } = useProveedores();
  const { operarios, getOperarios } = useOperario();
  const { actividades, getActividades } = useActividad();
  const { labores, getLabores } = useLabores();
  const { implementos, getImplementos } = useImplemento();
  const [openModal, setOpenModal] = useState(false);
  const [openModalCombustible, setOpenModalCombustible] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false)
  const [openModalEditarCombustible, setOpenModalEditarCombustible] = useState(false)
  const [openDialog,setOpenDilog]= useState(false)
  const [cabecera, setCabecera] = useState("")
  const [detalle, setDetalle] = useState([]);
  const [combustible, setCombustible] = useState([]);
  const [turno, setTurno] = useState('DIURNO');
  const [idTurno, setIdTurno] = useState('01');
  const [area,setArea]=useState('AREA DE CAMPO');
  const [idArea,setIdArea]=useState('005');
  const [idFormaPago,setIdFormaPago]=useState('HR');
  const [maquina,setMaquina]=useState('')
  const [idMquina,setIdMaquina]=useState('')
  const [proveedor,setProveedor]=useState('')
  const [idProveedor,setIdProveedor]=useState('')
  const [operario,setOperario]=useState('');
  const [idOperario,setIdOperario]=useState('');
  const [idConsumidor,setIdConsumidor]=useState('');
  const [descConsumidor,setDescConsumidor]=useState('');
  const [idActividad,setIdActividad]=useState('');
  const [descActividad,setDescActividad]=useState('');
  const [idLabor,setIdLabor]=useState("");
  const [descLabor,setDescLabor]=useState("");
  const [idJiron,setIdJiron]=useState('');
  const [idCuartel,setIdCuartel]=useState(''); 
  const [costoHora,setCostoHora]=useState('');
  const [HoraInicio,setHoraInicio]=useState("");
  const [HoraFin,setHoraFin]=useState("");
  const [horas_trab,setHoras_trab]=useState("");
  const [horas_trab1,setHoras_trab1]=useState("0");
  const [switchChecked,setSwitch]=useState(true);
  const [tipoParte,setTipoParte]=useState("PMA");
  const [costoTotal,setCostoTotal]=useState(0);
  const [areaTrabajada,setAreaTrabajada]=useState("")
  const [totalAreaTrabajada,setTotalAreaTrabajada]=useState(0)
  const [horometroInicio,setHorometroInicio]=useState("")
  const [horometroFin,setHorometroFin]=useState("")
  const [difHorometro,setDifHorometro]=useState(0)
  const [disabledFab,setDisabledFab]=useState(true)
  const [disabledGuardar,setDisabledGuardar]=useState(true)
  const [mensajeDialog,setMensajeDialog]=useState("")
  const [horas_trabCabecera,setHoras_trabCabecera]=useState(0);
  const [horas_trab1_cabecera,setHoras_trab1_cabecera]=useState(0);  
  const [totalCostoCabecera,setTotalCostoCabecera]=useState(0);
  const [openGuardar,setOpenGuardar]=useState(false);
  const [openBorrar,setOpenBorrar]=useState(false);
  const [descJiron,setDescJiron]=useState("");
  const [descCuartel,setDescCuartel]=useState("");
  const [index,setIndex]=useState("");
  const [bloquearGuardar,setBloquearGuardar]=useState(false)
  const [fecha, setFecha] = useState(dateFormat(new Date(),'yyyy-mm-dd'));
  const [valueLabor, setValueLabor] = useState("");
  const [idImplemento, setIdImplemento] = useState("");
  const [descImplemento, setDescImplemento] = useState("");
  const [glosa, setGlosa] = useState("");
  const [value, setValue] = useState('1');
  const [idCombustible, setIdCombustible] = useState("");
  const [descCombustible, setDescCombustible] = useState("");
  const [idMedidaCom, setIdMedidaCom] = useState("");
  const [cantCombustible, setCantCombustible] = useState("");
  const [indexCombustible, setIndexCombustible] = useState("");

  const cambiarTab = (event, newValue) => {
    setValue(newValue);
  };
  
  
  const abrirDialog = () => {
    setOpenDilog(true);
  };  
  const cerrarDialog = () => {
    setOpenDilog(false);
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
      if(parseFloat(horometroInicio)<parseFloat(event.target.value)){
        setHorometroFin(event.target.value)
        var dif_horo=parseFloat(event.target.value)-parseFloat(horometroInicio)
        setDifHorometro(dif_horo.toFixed(2))
        setHoras_trabCabecera(dif_horo.toFixed(2))
      }else{
        setDifHorometro(0)
        console.log(("Horometro final menor que horoemtro de inicio"))
      }
    }else{
      setDifHorometro(0)
      alert("ingrese horometro de Inicio")
    }
    
    
  };

  const cambiarHorometroInicio = (event) => {
    console.log(event.target.value)
    if(event.target.value!=""){
      setHorometroInicio(event.target.value)
    }else{   
      setHorometroInicio("")  
    }
    
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
        setHoraInicio('')        
        alert("Hora Inicio no puede ser mayor a hora fin")

      }else{    
        if(HoraFin!="" && idLabor!=""&& idActividad!=""){
          setDisabledFab(false)
          setDisabledGuardar(false)
        }    
        setHoraInicio(event.target.value)
      }
      
    }else{
      setDisabledFab(true)
      setDisabledGuardar(true)
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

          
          if(idActividad!="" && idLabor!=""){
            setDisabledFab(false)
            setDisabledGuardar(false)
          }
          
          
        }        

      }else{
        setDisabledFab(true)
        setDisabledGuardar(true)
        setHoraFin('')
        alert('Hora fin no puede ser menor a hora de inicio')
      }
    }else{
      setDisabledFab(true)
      setDisabledGuardar(true)
      setHoraFin('')
        alert('Seleccione hora inicio primero')
    }
    
    


  }; 

  const cambiarCuartel = (newValue) => {
    if(newValue!=null){
      console.log(newValue.ID)
      setIdCuartel(newValue.ID)
      setDescCuartel(newValue.DESCRIPCION)
    }else{
      setIdCuartel("");
    }
  };

  const cambiarJiron = (newValue) => {
    console.log(newValue)
    if(newValue!=null){
      console.log(newValue.ID)
      setIdJiron(newValue.ID)
      setDescJiron(newValue.DESCRIPCION)
    }else{
      setIdJiron("");
    }
  };

  const cambiarActividad = (newValue) => {
    console.log(newValue) 
    if(newValue!=null){
      console.log(newValue.ID)
      setIdActividad(newValue.ID) 
      getLabores(newValue.ID) 
      setValueLabor("")
      setIdLabor("")
      setDescLabor("")
              
    }else{
      setIdActividad("");
    }
  }; 

  const cambiarLabor = (newValue) => {
    console.log(newValue)
    if(newValue!=null){
      setValueLabor(newValue) 
      console.log(newValue.ID)
      setIdLabor(newValue.ID)  
      setDescLabor(newValue.DESCRIPCION)
              
    }else{
      setIdLabor("");
    }
  };
  
  const cambiarConsumidor = (newValue) => {
    if(newValue!=null){
      
      setIdConsumidor(newValue.ID) 
      setDescConsumidor(newValue.DESCRIPCION) 
      console.log(idConsumidor)
      
    }else{
      setIdConsumidor("");
    }
  }; 

  const cambiarOperario = (newValue) => {
    if(newValue!=null){
      console.log(newValue)
      setIdOperario(newValue.ID)  
      setOperario(newValue.DESCRIPCION) 
      
      if(idMquina!=""&& idLabor!=""){
        setDisabledFab(false)
        setDisabledGuardar(false)
      }
      
    }else{
      setDisabledFab(true)
      setDisabledGuardar(true)
      setIdOperario("");
    }


  }; 

  const cambiarProveedor = (event,newValue) => {
    
    if(event!=null){
      console.log(event)
      setIdProveedor(event.ID)   
      setProveedor(event.DESCRIPCION)    
      
    }else{
      setIdProveedor("");
    }
  };

  const inputGlosa = (event) => {
    console.log(event.target.value)
    if(event.target.value!=null){
      setGlosa(event.target.value)
    }
  };

  const cambiarImplemento = (newValue) => {
    
    if(newValue!=null){
      console.log(newValue)
      setIdImplemento(newValue.ID)   
      setDescImplemento(newValue.DESCRIPCION)    
      if(idMquina!="" && idProveedor!=""){
        setDisabledFab(false)
        setDisabledGuardar(false)
      }
    }else{
      setIdImplemento("");
    }
  };

  const cambiarMaquina = (newValue) => {
    if(newValue!=null){
      console.log(newValue)
      setIdMaquina(newValue.ID)  
      setMaquina(newValue.DESCRIPCION)
      setCostoHora(newValue.COSTO_MOF)
      
      if(idOperario!="" && idActividad!="" && idLabor!="" && HoraInicio!="" && HoraFin!="" ){
        setDisabledFab(false)
        setDisabledGuardar(false)
      }
    }else{
      setDisabledFab(true)
      setDisabledGuardar(true)
      setIdMaquina("");
    }
  }; 

  const cambiarArea = (event,newValue) => {
    setIdArea(event.target.value);
    setArea(newValue.props.name);
  };

  const cambiarTurno = (event,newValue) => {
    setIdTurno(event.target.value);
    setTurno(newValue.props.name)
    
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
  
const OpenModal = () => {
  setIdConsumidor("")
  setIdJiron("")
  setIdCuartel("")
  setAreaTrabajada("")
  setOpenModal(true);
};

const CloseModal = () => {
  setOpenModal(false);
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
  
  if(idConsumidor==""){
    setMensajeDialog("Ingrese un consumidor para continuar")
    setOpenDilog(true)
    return
  } 

  if(idJiron=="" && tipoParte=='PMA'){
    setMensajeDialog("Ingrese un lote para continuar")
    setOpenDilog(true)
    return
  } 

  if(idCuartel=="" && tipoParte=='PMA'){
    setMensajeDialog("Ingrese un valvula para continuar")
    setOpenDilog(true)
    return
  }

  if(areaTrabajada=="" && tipoParte=='PMA'){
    setMensajeDialog("Ingrese el area para continuar")
    setOpenDilog(true)
    return
  }

  if(idLabor==""){
    setMensajeDialog("Ingrese una labor para continuar")
    setOpenDilog(true)
    return
  } 

  var item= new Object({
    IDCONSUMIDOR:idConsumidor,
    IDCONSUMIDORIMPLEMENTO:idImplemento,
    DESCRIPCION: descConsumidor,
    AREA_TRAB: areaTrabajada!=''?areaTrabajada:0,
    HORAINICIO:HoraInicio,
    HORAFINAL:HoraFin,
    HOROMETROINICIAL:horometroInicio,
    HOROMETROFINAL:horometroFin,
    HORAS_TRAB:horas_trab,
    HORAS_TRAB1:horas_trab1,
    COSTO_HORA: costoHora,
    IDACTIVIDAD: idActividad,
    IDLABOR: idLabor,
    DSC_LABOR: descLabor,
    HOROMETRO_DIFERENCIA:difHorometro,
    COSTO_TOTAL:costoTotal,
    IDJIRON: idJiron,
    DESCJIRON:descJiron,
    IDCUARTEL: idCuartel,
    DESCCUARTEL:descCuartel,
    

  })
  console.log(item)
  detalle.push(item)
  if(idFormaPago=='HR'){
    var total_area=areaTrabajada!=""?parseFloat(totalAreaTrabajada)+parseFloat(areaTrabajada):0
    var total_costo=parseFloat(costoHora)*parseFloat(horas_trab1_cabecera)
    setTotalCostoCabecera(total_costo.toFixed(2))
    setTotalAreaTrabajada(total_area.toFixed(2))
    console.log(total_costo)
    console.log(total_area)
  }else{
    var total_area=areaTrabajada!=""?parseFloat(totalAreaTrabajada)+parseFloat(areaTrabajada):0
    var suma=parseFloat(horas_trab1_cabecera)+parseFloat(areaTrabajada)
    var suma_totalCosto=parseFloat(horas_trab1_cabecera)*parseFloat(costoHora)
    setTotalAreaTrabajada(total_area.toFixed(2))
    setHoras_trab1_cabecera(suma.toFixed(2))
    setTotalCostoCabecera(suma_totalCosto.toFixed(2))
    setHoras_trabCabecera(suma.toFixed(2))
    console.log(suma)
    console.log(total_area)

  }  
  CloseModal()

}

const EditarItem=()=>{
  
  detalle.map((item,i)=>{
      detalle[index].AREA_TRAB=areaTrabajada
      if(formaPago==='HA'){
        detalle[index].COSTO_TOTAL=(areaTrabajada*detalle[index].COSTO_HORA).toFixed(2)
      }      
  })

  let suma = detalle.reduce((acumulador, actual) => parseFloat(acumulador) + parseFloat(actual.AREA_TRAB), 0);
  
  if(idFormaPago=='HA'){
    setHoras_trab1_cabecera(suma.toFixed(2))
  }  
  setTotalAreaTrabajada(suma.toFixed(2))
  console.log(suma.toFixed(2))
  CloseModalEditar()

}

const editarCombustible=()=>{
  
  combustible[indexCombustible].CANTIDAD=cantCombustible   
  console.log(combustible)
  CloseModalEditarCombustible()

}

//GUARDA EL PARTE DE MAQUINARIA INTERNAMENTE
 const guardarBorrador =()=>{

  if(idMquina==""){
    setMensajeDialog("Seleccione una maquina para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(idProveedor=="" && tipoParte=='PMA'){
    console.log(idProveedor)
    console.log(tipoParte)
    setMensajeDialog("Ingrese un proveedor para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(idOperario==""){
    setMensajeDialog("Seleccione un operario para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(idActividad==""){
    setMensajeDialog("Seleccione una actividad para continuar")
    setOpenDilog(true)
    setOpenGuardar(false)
    return
  } 

  if(idLabor==""){
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

  if(horometroFin=="" ){
    setMensajeDialog("Ingrese horometro final para continuar")
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

  var cabecera= new Object({
    IDDOCUMENTO: tipoParte,
    IDCONSUMIDORMAQUINARIA: idMquina,
    MAQUINA:maquina,
    OPERARIO:operario,
    AREA:area,
    PROVEEDOR:proveedor,
    TURNO:turno,
    IDIMPLEMENTO:idImplemento,
    DESCIMPLEMENTO:descImplemento,
    DESCCONSUMIDOR:descConsumidor,
    GLOSA: glosa,
    IDOPERARIO: idOperario,
    HORAINICIO:HoraInicio,
    HORAFINAL:HoraFin,
    IDACTIVIDAD:idActividad,
    IDLABOR:idLabor,
    HOROMETROINICIAL:horometroInicio,
    HOROMETROFINAL:horometroFin,
    HORAS_TRAB:horas_trabCabecera,
    HORAS_TRAB1:horas_trab1_cabecera,
    IDTURNOTRABAJO: idTurno,
    TOTAL_COSTO: totalCostoCabecera,
    TOTALAREA_TRAB: totalAreaTrabajada,
    FORMAPAGO: idFormaPago,
    IDAREA: idArea,
    COSTO_HORA:costoHora,
    IDCLIEPROV:idProveedor,
    IDUSUARIO:idUsuario,
    FECHA:fecha
  })
  
  if(detalle.length>1){
      var rango=[]
      var rango_horometro=[]
      var horas=[]
      var min=[]
      var minFn=[]
      const hora_ini=parseFloat(HoraInicio.replace(':','.'))
      rango.push(hora_ini)
      rango_horometro.push(horometroInicio)
      horas.push(hora_ini)
      var fin=0;
      var fin_horometro=0

      detalle.map((item,i)=>{
          var area_percent=(item.AREA_TRAB*100)/totalAreaTrabajada
          var minutos=(horas_min*area_percent)/100
          var minutos_item=(minutos/60).toFixed(2)
          fin=rango[i]+parseFloat(minutos_item)
          rango.push(fin)
          detalle[i].HORAS_TRAB=minutos_item
          detalle[i].HORAINICIO=parseFloat(rango[i]).toFixed(2)
          detalle[i].HORAFINAL=parseFloat(rango[i]+parseFloat(minutos_item)).toFixed(2)
          //-----------------------------------------------------------------------------

          var dif_horo=(difHorometro*area_percent)/100
          console.log(dif_horo)
          fin_horometro=parseFloat(rango_horometro[i])+dif_horo
          
          
          rango_horometro.push(fin_horometro.toFixed(2))
          detalle[i].HOROMETROINICIAL=parseFloat(rango_horometro[i]).toFixed(2)
          detalle[i].HOROMETROFINAL=parseFloat(rango_horometro[i+1]).toFixed(2)//+dif_horo.toFixed(2)
          detalle[i].HOROMETRO_DIFERENCIA=dif_horo.toFixed(2)
        })
  

      detalle.map((item,i)=>{
        var minInicio=(detalle[i].HORAINICIO).slice(-3)
        var horaInicio=(detalle[i].HORAINICIO).slice(0,-3) 
        min.push(minInicio)    
        var minIni= i===0? parseFloat(min[i])*100:Math.round(parseFloat(min[i])*60)
        
        var minFin=(detalle[i].HORAFINAL).slice(-3)
        var horaFin=(detalle[i].HORAFINAL).slice(0,-3)  
        minFn.push(minFin)  
        
        var minF= Math.round(parseFloat(minFn[i])*60)

        detalle[i].HORAINICIO=parseFloat(horaInicio+'.'+parseFloat(minIni)).toFixed(2)
        detalle[i].HORAFINAL=parseFloat(horaFin+'.'+minF).toFixed(2)

        //--------------------------------------------------------------------------------------------

          var hora1=detalle[i].HORAINICIO.split('.')        
          var hora2=detalle[i].HORAFINAL.split('.')
          var t1=new Date();
          var t2= new Date();
          t2.setHours(hora1[0], hora1[1]);
          t1.setHours(hora2[0], hora2[1]);
          t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds())
          var horas_t1=(t1.getHours() ? t1.getHours(): "0") + (t1.getMinutes() ? "." +(t1.getMinutes()<10?'0':'')+ t1.getMinutes() : ".00")          
          detalle[i].HORAS_TRAB1=horas_t1
          detalle[i].COSTO_TOTAL=(parseFloat(detalle[i].HORAS_TRAB)*parseFloat(detalle[i].COSTO_HORA)).toFixed(2)
              
      })
    }else{
      
      detalle[0].HORAINICIO=HoraInicio.replace(':','.')
      detalle[0].HORAFINAL=HoraFin.replace(':','.')
      detalle[0].HORAS_TRAB=horas_trab1_cabecera
      detalle[0].HORAS_TRAB1=horas_trabCabecera
      detalle[0].HOROMETROINICIAL=horometroInicio
      detalle[0].HOROMETROFINAL=horometroFin
      detalle[0].HOROMETRO_DIFERENCIA=difHorometro
      detalle[0].COSTO_TOTAL=(parseFloat(detalle[0].HORAS_TRAB)*parseFloat(detalle[0].COSTO_HORA)).toFixed(2)

    }
  
  setBloquearGuardar(true)

   

  registrarParte(
    { cabecera,
      detalle,
      user,
      combustible,
      onSuccess : (response)=>{
        console.log(response)
        navigate('/home',{replace:true})
        
      }
    }
    )
   
 }  

  const abrirDialogGuardar = () => {
    setOpenGuardar(true);
  }; 
   
  const cerrarDialogGuardar = () => {
    setOpenGuardar(false);
  };

  const itemSeleccionado=(item,i)=>{
    console.log(item)
    setIndex(i)
    setIdConsumidor(item.DESCRIPCION)
    setIdJiron(item.DESCJIRON)
    setIdCuartel(item.DESCCUARTEL)
    setAreaTrabajada(item.AREA_TRAB)
    OpenModalEditar()
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

    setTotalAreaTrabajada(suma.toFixed(2))
    
    console.log(suma.toFixed(2))
    console.log(horas_trab1_cabecera)
    setOpenBorrar(false)
    CloseModalEditar()
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

  useEffect( () => { 
    getTurnosTrabajo()
    getAreas()
    getMaquinarias()
    getOperarios()
    getActividades()  
    getProveedores()  
    getImplementos()
    
    
  },[]);

  
  return (  
    <div>
        <div>
        <Appbar nombre={"Nuevo Parte de Maquinaria"} mostrarSalir={'none'} mostrarEnviar={"none"} guardar={abrirDialogGuardar}></Appbar> 
        <Dialogs open={openGuardar} cerrar={cerrarDialogGuardar} aceptar={guardarBorrador} mensaje={"¿Está seguro de guardar los datos?"} esconder={'none'} disabled={false}></Dialogs>
        <Dialogs open={openDialog} cerrar={cerrarDialog} aceptar={cerrarDialog} mensaje={mensajeDialog} esconder={'none'}></Dialogs>      
        <Dialogs open={openBorrar} cerrar={cerrarDialogBorrar} aceptar={borrarItem} mensaje={"¿Está seguro de borrar item?"} esconder={'none'}></Dialogs>    
        <Interruptor cambiarSwitch={cambiarSwitch} switchChecked={switchChecked}></Interruptor>
        <Box>
          <CabeceraParteMaquinaria
          cabecera={cabecera} 
          areas={areas} 
          idArea={idArea}
          cambiarArea={cambiarArea}
          turnos={turnostrabajo}    
          turno={turno}      
          idTurno={idTurno}
          cambiarTurno={cambiarTurno}
          maquinarias={maquinarias}
          cambiarMaquina={cambiarMaquina}
          proveedores={proveedores}
          cambiarProveedor={cambiarProveedor}
          actividades={actividades}
          cambiarActividad={cambiarActividad}
          labores={labores}
          descLabor={descLabor}
          cambiarLabor={cambiarLabor}
          formaPago={formaPago}
          idFormaPago={idFormaPago}
          cambiarFormaPago={cambiarFormaPago}
          operarios={operarios}
          cambiarOperario={cambiarOperario}  
          horas_trabCabecera={horas_trabCabecera} 
          horas_trab1_cabecera={horas_trab1_cabecera}
          tipoParte={tipoParte}    
          cambiarHoraInicio={cambiarHoraInicio}
          cambiarHoraFin={cambiarHoraFin}
          horaFin={HoraFin}   
          horaInicio={HoraInicio} 
          cambiarHorometroInicio={cambiarHorometroInicio}
          cambiarHorometroFin={cambiarHorometroFin}
          difHorometro={difHorometro}
          disabled={detalle.length>=1?true:false}
          asignarFecha={asignarFecha}
          fecha={fecha}
          cambiarConsumidor={cambiarConsumidor} 
          cambiarImplemento={cambiarImplemento}
          implementos={implementos}
          inputGlosa={inputGlosa}
          valueLabor={valueLabor}

          />
        </Box>
        <p></p>
        <Box>
        <TabContext value={value}>
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
            
              <Fab sx={{position: 'absolute', bottom: 20, right:20}} aria-label={'Add_detalle'} color = 'success' size='large'  onClick={OpenModal}>
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
            valueLabor={valueLabor}
            handleCloseModal={CloseModal}
            cambiarConsumidor={cambiarConsumidor}  
            cambiarJiron={cambiarJiron}
            cambiarCuartel={cambiarCuartel}
            cambiarAreaTrabajada={cambiarAreaTrabajada}
            guardar={guardarItem}
          />
          <FormularioModalEditar
            open={openModalEditar} 
            handleCloseModal={CloseModalEditar}
            idConsumidor={idConsumidor}       
            jiron={idJiron}
            cuartel={idCuartel}
            areaTrabajada={areaTrabajada}
            cambiarAreaTrabajada={cambiarAreaTrabajada}
            guardar={EditarItem}
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
