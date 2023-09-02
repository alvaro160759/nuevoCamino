import { Box, Button, Card, CardContent, CardHeader, Grid, Icon, Tooltip, Typography } from "@mui/material";
import IconDynamic from "../../components/icons/IconDynamic";
import { rows } from "./data/headCells";
import { Tabla } from "./components/Tabla";



function Conductores() {

  return (
    <Card id="delete-account" sx={{m:5, boxShadow:5,borderRadius:2}}>
        <CardHeader 
        title={<Box  px={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" >
                    Listado de conductores
                    </Typography>
                    <Button variant="contained"  size="small" sx={{background:'black'}}>
                    <IconDynamic nombre={'AddCircle'}/>
                    &nbsp;Nuevo
                    </Button>
                </Box>}
        sx={{background:"linear-gradient(310deg, #f5365c, #f56036)",color:'white',height:40}}
        >
        </CardHeader>
        <CardContent>
        <Box p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Box>
              <Tabla rows={rows}></Tabla>
            </Box>
          </Grid>
        </Grid>
      </Box>
        </CardContent>
      
    </Card>
  );
}

export default Conductores;
