import React from 'react';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Autocompletar } from '../../components/autocomplete/Autocomplete';
import InputFecha from '../../components/datePicker/DatePicker';



export const CabeceraParteMaquinaria = (props) => {

  

  return (
    <Grid container spacing={'5px'} >          
          <Grid item xs={3}>
          <TextField
          id="txtarea"
          select
          label="Área"
          size='small'
          value={props.idArea}
          sx={{width:'100%',}}
          onChange={(event,newValue)=>props.cambiarArea(event,newValue)}
         >
          {props.areas.map((option) => (
            <MenuItem key={option.ID} value={option.ID} name={option.DESCRIPCION}>
              <Typography fontSize={12}>{option.DESCRIPCION}</Typography>
            </MenuItem>
          ))}
          
        </TextField> 
          </Grid>
          <Grid item xs={3} >
          <TextField
          id="txtturno" 
          select
          label="Turno"
          size='small'
          value={props.idTurno}
          sx={{width:'100%'}}
          onChange={(event,newvalue)=>props.cambiarTurno(event,newvalue)}
          //name={props.turno}
         >
          {props.turnos.map((option) => (
            <MenuItem key={option.idturno} value={option.idturno} name={option.descripcion}>
              <Typography fontSize={12} name={option.descripcion}>{option.descripcion}</Typography>
            </MenuItem>
          ))}
        </TextField> 
          </Grid>

          <Grid item xs={3}>
          <TextField
          id="txtformaPago"
          select
          label="Forma de Pago"
          size='small'
          value={props.idFormaPago}
          sx={{width:'100%'}}
          onChange={props.cambiarFormaPago}
        >
          {props.formaPago.map((option) => (
            <MenuItem key={option.ID} value={option.ID}>
              <Typography fontSize={12}>{option.DESCRIPCION}</Typography>
            </MenuItem>
          ))}
        </TextField>  
          </Grid>

          <Grid item xs={3}>
            <InputFecha fecha={props.fecha} label="Fecha" asignarFecha={value=>props.asignarFecha(value)}></InputFecha> 
          </Grid>
          <Grid item xs={12} >
          <Autocompletar label={'Maquina'} options={props.maquinarias} cambiar={(event,newValue)=>props.cambiarMaquina(newValue)} disabled={props.disabled} ></Autocompletar> 
          </Grid>  
          <Grid item xs={12}>
          <Autocompletar label={'Implemento'} options={props.implementos} cambiar={(event,newValue)=>props.cambiarImplemento(newValue)}></Autocompletar> 
          </Grid>           
          <Grid item xs={6} >            
          <Autocompletar label={'proveedor'} options={props.proveedor} cambiar={(event,newValue)=>props.cambiarProveedor(newValue)} disabled={props.tipoParte=='PMQ'?true:false}></Autocompletar> 
          </Grid>
          <Grid item xs={6} >           
          <Autocompletar label={'Operario'} options={props.operarios} cambiar={(event,newValue)=>props.cambiarOperario(newValue)}></Autocompletar> 
          </Grid> 
          <Grid item xs={6} >           
          <Autocompletar label='Actividad' options={props.actividades} cambiar={(event,newValue)=>props.cambiarActividad(newValue)}></Autocompletar>
          </Grid>
          <Grid item xs={6} >           
          <Autocompletar label='Labor' options={props.labores} cambiar={(event,newValue)=>props.cambiarLabor(newValue)} input={props.descLabor} value={props.valueLabor}></Autocompletar>
          </Grid>
          {/* { props.tipoParte=='PMQ'&&<Grid item xs={12} >
          <Autocompletar label='Consumidor'options={props.consumidores} cambiar={(event,newValue)=>props.cambiarConsumidor(newValue)}></Autocompletar> 
          </Grid>  } */}
          <Grid item xs={4}>
          <TextField label={'Hora Inicio'} sx={{width:'100%'}} type="time" InputLabelProps={{shrink: true}} onChange={(event)=>props.cambiarHoraInicio(event)} value={props.horaInicio} size='small'></TextField>
          </Grid>
          <Grid item xs={4} >
          <TextField label={'Hora Fin'} sx={{width:'100%'}} type="time" InputLabelProps={{shrink: true}} onChange={(event)=>props.cambiarHoraFin(event)} value={props.horaFin} size='small'></TextField> 
          </Grid>
          <Grid item xs={4} >
          <TextField 
            id="txtCantidadCabecera" 
            label={'Cantidad HR/HA'} 
            sx={{width:'100%'}} 
            size='small'
            color='success' 
            focused
            value={props.horas_trab1_cabecera} 
            InputLabelProps={{shrink: true}}>
          </TextField> 
          </Grid>
          <Grid item xs={4}>
          <TextField label={'Horometro Inicial'} sx={{width:'100%'}} type={'number'} onChange={(event)=>props.cambiarHorometroInicio(event)} size='small'></TextField> 
          </Grid>
          <Grid item xs={4} >
          <TextField label={'Horometro Final'} sx={{width:'100%'}} type={'number'} onChange={(event)=>props.cambiarHorometroFin(event)} size='small'></TextField>
          </Grid>
          <Grid item xs={4} >
            <TextField label={'Dif. Horometro'} sx={{width:'100%'}} color='success' focused InputLabelProps={{shrink: true}} value={props.difHorometro} size='small'></TextField>
          </Grid>
          {/* <Grid item xs={6} >
          <TextField label={'Total Horas'} sx={{width:'100%', }} color='success' focused InputLabelProps={{shrink: true}} value={props.horas_trab1_cabecera} size='small'></TextField> 
          </Grid> */}
          <Grid item xs={12}>
            <TextField
            label={'Observaciones'} sx={{width:'100%'}} color='success' 
             focused InputLabelProps={{shrink: true}} onChange={(event)=>{props.inputGlosa(event)}} size='small' ></TextField>
          </Grid> 
    </Grid>
  )
}

