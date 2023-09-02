import Grid from "@mui/material/Grid";
import Typography  from "@mui/material/Typography";
import { Box } from "@mui/material";

function Container({header, title, description, children }) {
  return (
    <Box>
      <Grid container>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }} pt={7} display="flex" flexDirection="column" justifyContent="center" height="70vh">
          <Box display="flex" flexDirection="column" justifyContent="center" height="60vh"  borderRadius={5} boxShadow={15}>
            <Box pt={2}>
              {!header ? (
                <>
                  <Box mb={1} >
                    <Typography 
                      variant="h4" 
                      fontWeight="700"  
                      fontSize={'2rem'} 
                      fontFamily={'Open Sans, Helvetica,Arial'} 
                      lineHeight={'1.875'}
                    >
                     {title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    borderColor={'green'} 
                    fontFamily={'Open Sans, Helvetica,Arial'}
                  >
                  {description}
                  </Typography>
                </>
              ) : (
                header
              )}
            </Box>
            <Box p={3}>{children}</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Container;
