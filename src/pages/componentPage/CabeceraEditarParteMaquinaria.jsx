import React from 'react';
import { Box, Chip,  Grid, Typography } from '@mui/material';



export const CabeceraEditarParteMaquinaria = ({cabecera}) => {
  
  return (
    <Box>
    <Grid container spacing={1} sx={{marginTop:1}}  >
      
        <Grid item xs={12}>
          {cabecera.ESTADO!='P'  &&<Chip fontSize={18} fontWeight='bold'   label={cabecera.ESTADO=='A'?'PMA-0002-'+cabecera.NUMERO+' - ANULADO':'PMA-0002:'+cabecera.NUMERO+' - ENVIADO'} color={cabecera.ESTADO=='A'?'error':'success'}/>}
        </Grid>
        <Grid item xs={4.7}>          
          <Typography fontSize={12} textAlign={'left'}  fontWeight='bold' component={'h5'}  >  
            Area: <Chip sx={{marginLeft:3.7}}label={cabecera.AREA.DESCRIPCION} variant="outlined" size='small' color='success' /> 
          </Typography>
        </Grid>
          
        <Grid item xs={3.8} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'}  marginRight={5}>
            Turno: <Chip label={cabecera.TURNO.DESCRIPCION} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>

        <Grid item xs={3.5}>
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Fecha: <Chip label={cabecera.FECHA} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>

        <Grid item xs={12} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Maquina: <Chip sx={{marginLeft:1}}label={cabecera.MAQUINA.DESCRIPCION} variant="outlined" size='small' color='success'/>
          </Typography>       
        </Grid>  

        {/* <Grid item xs={12} >
          { cabecera.DESCIMPLEMENTO &&
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Implemen: <Chip label={cabecera.DESCIMPLEMENTO} variant="outlined" size='small' color='success'/>
          </Typography> }
        </Grid>  */}
          
        { cabecera.IDDOCUMENTO=='PMA' &&
        <Grid item xs={12} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Proveedor: <Chip label={cabecera.PROVEEDOR.DESCRIPCION} variant="outlined" size='small' color='success'/>
          </Typography> 
        </Grid>}
        
        <Grid item xs={8}>  
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Operario: <Chip sx={{marginLeft:1}}label={cabecera.OPERARIO.DESCRIPCION} variant="outlined" size='small' color='success'/>
          </Typography> 
        </Grid>

        <Grid item xs={4}>         
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Pago: <Chip label={cabecera.FORMAPAGO=='HR'?"POR HORA":"POR HECTAREA"} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>
          
        <Grid item xs={4}>
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Hora Inicial: <Chip label={cabecera.HORAINICIO} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>
        
        <Grid item xs={4} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Hora Final: <Chip label={cabecera.HORAFINAL} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>
        
        <Grid item xs={4} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Cantidad HR/HA: <Chip label={parseFloat(cabecera.HORAS_TRAB1).toFixed(2)} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Htro. Inicial: <Chip label={cabecera.HOROMETROINICIAL} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>

        <Grid item xs={4} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Htro. Final: <Chip label={cabecera.HOROMETROFINAL} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>
        
        <Grid item xs={4} >
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Tot. Horas Netas: <Chip label={cabecera.HORAS_TRAB} variant="outlined" size='small' color='success'/>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography fontSize={12} textAlign={'left'} fontWeight='bold' component={'h5'} >
            Observaciones: {cabecera.GLOSA!=""?<Chip label={cabecera.GLOSA} variant="outlined" size='small' color='success'/>:""}
          </Typography>
        </Grid> 
    </Grid>
    
    </Box>
  )
}


