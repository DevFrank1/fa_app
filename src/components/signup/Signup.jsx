import React from 'react';
import './signup.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { signInWithGoogle } from '../../firebaseConfig';
import { Typography } from '@mui/material';

const Signup = () => {
  return (
    <Box>
        <Button variant='contained' onClick={signInWithGoogle}>Sign up</Button>
        <Typography>{localStorage.getItem('name')}</Typography>
        <Typography>{localStorage.getItem('email')}</Typography>
        <Typography>{localStorage.getItem('profilePic')}</Typography>
    </Box>
  )
}

export default Signup