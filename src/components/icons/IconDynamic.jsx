import * as Icons from '@mui/icons-material/';

export default function IconDynamic({nombre,ancho,alto}){
  const IconComponent = Icons[nombre];
  if (!IconComponent) { 
    return <Icons.Home />;
  }
  return <IconComponent  sx={{width:30,height:30}}/>;
};
