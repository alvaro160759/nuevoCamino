import { Stack, styled, Switch, Typography } from "@mui/material";
import { React } from "react";

export const Interruptor = (props) => {

    const SwitchC = styled(Switch)(({ theme }) => ({
        padding: 8,
        
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          background: '#FF2D00',
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" /></svg>')`,
            left: 12,
          },
          '&:after': {      
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          
          width: 16,
          height: 16,
          margin: 2,
        },
      }));

    return ( 
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" display="flex">            
            
            <Typography variant="h6" sx={{fontWeight:'bold'}}>Propia</Typography>
            <SwitchC  color="success" size="medium" checked={props.switchChecked} onClick={props.cambiarSwitch}/>
            <Typography variant="h6" sx={{fontWeight:'bold'}}>Alquilada</Typography>
          </Stack>

     );
}
 