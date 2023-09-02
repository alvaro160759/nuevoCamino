import { Box,} from "@mui/material";
import { DataGrid, esES, GridToolbarQuickFilter } from "@mui/x-data-grid";


export const Tabla = (props) => {

    function QuickSearchToolbar() {
        return (
        <Box mt={2} mb={5} >
            <GridToolbarQuickFilter sx={{
            position: 'absolute',
            left: 5,
            m:0
            }} />
        </Box>
        );
    }  
    
    const columns = [
        { field: 'id',            headerName: 'N°', width: 5},
        { field: 'DNI',           headerName: 'DNI', width: 100 },
        { field: 'NOMBRE',        headerName: 'APELLIDOS Y NOMBRES', width: 300},
        { field: 'direccion',     headerName: 'DIRECCION', width: 400,align:'left',headerAlign:'left'},
        { field: 'licencia',          headerName: 'CATEGORIA', width: 120,align:'center',headerAlign: 'center',},
        { field: 'telefono',      headerName: 'TELEFONO', width: 120},
      ];

    return ( 
        <Box 
        sx={{width:'100%',height:500,
            "& .MuiDataGrid-root .MuiDataGrid-row:hover": {
              background: "black",
              color: "white"
            },
            '.MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
          }}}
        >
        
        <DataGrid            
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{ Toolbar: QuickSearchToolbar }}
            rows={props.rows}
            columns={columns}
            pageSize={20}  
            density='compact'           
        />
        </Box>
     );
}
 
