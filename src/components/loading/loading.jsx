import { Backdrop, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const Loading = (props) => {
  return (
    <Backdrop open={props.open} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }} >
        
      </CircularProgress>
      <p></p>
      <Typography sx={{ color: 'white' }}>{props.label}</Typography>
    </Backdrop>
  );
};

export default Loading;