import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { MdVisibility as Visibility, MdVisibilityOff as VisibilityOff } from 'react-icons/md';

export const PasswordField = (props)=>  {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      color='success'     
      margin="normal"
      fullWidth
      variant="outlined"
      id={'txtPassword'}
      label={'Contraseña'}
      type={showPassword ? 'text' : 'password'}
      inputProps={{ minLength: 6 }}
      required
      size='medium'
      onChange={props.onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};