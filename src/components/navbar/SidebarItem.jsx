import {  Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon, List, Collapse, ListItemButton } from '@mui/material';
import { MdExpandLess as ExpandLessIcon, MdExpandMore as ExpandMoreIcon } from 'react-icons/md';
import {IconDynamic} from "../Icons/IconDynamic";

export const SidebarItem = ({objMenu,handleOpenSettings,cerrar}) => {
    return (
        <>
            {objMenu.IDPADRE==0 &&<ListItem onClick={()=>handleOpenSettings(objMenu.IDMENUWEB)}>
                <ListItemIcon >
                    <IconDynamic nombre={objMenu.icon}/>
                </ListItemIcon>
                <ListItemText primary={objMenu.DESCRIPCION} />
                {objMenu.openCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            
            }
            <Collapse in={objMenu.openCollapsed} timeout="auto" unmountOnExit>
            {
                objMenu.hijos!=undefined && objMenu.hijos.map(hijo=>{
                    return(
                        <List key={hijo.DESCRIPCION} component="ul" disablePadding >
                            <ListItemButton sx={{ pl: 4 }}
                                to = {hijo.ENLACE}
                                component = {Link}
                                onClick={cerrar}
                                // style={({ isActive }) =>
                                //     isActive ? activeStyle : undefined
                                // }
                                >
                                    <ListItemIcon sx={{padding:0,margin:0}}>
                                        <IconDynamic nombre={hijo.icon}/>
                                    </ListItemIcon>                                            
                                <ListItemText secondary={hijo.DESCRIPCION}  />
                            </ListItemButton>
                        </List>)
                    })
            }
            </Collapse>

        </>
    )
}