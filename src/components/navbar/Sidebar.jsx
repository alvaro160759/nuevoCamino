import { useEffect} from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/system';
import { Drawer, ListItem,  ListItemButton, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {MENUS} from './menus'
import IconDynamic from '../icons/IconDynamic';

export const Sidebar = ({isOpen, close, moduloActual}) => {
  const theme = useTheme();
    
    return (
        <Drawer  open={isOpen} onClose={close}
        transitionDuration={500}
        >
          <Box width={theme.spacing(35)} height="100%" display="flex" flexDirection="column"  >
            <List sx={{mt:7.5}}>
              
              {MENUS.map((item, index) => (
                <ListItem key={item.ID} disablePadding sx={{ display: 'block','&:hover': {
                  //background: "linear-gradient(310deg, #2dce89, #2dcecc)",
                  background:"linear-gradient(310deg, #f5365c, #f56036)",
                  color: "white",
                  boxShadow:10
                  
              }}}>
                  <ListItemButton>
                    <ListItemIcon >
                      <IconDynamic nombre={item.ICON}/>
                    </ListItemIcon>
                    <ListItemText  sx={{ opacity: 'open ? 1 : 0 '}}>
                     <Typography sx={{fontWeight:'bold'}}>{item.DESCRIPCION}</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
    )
}