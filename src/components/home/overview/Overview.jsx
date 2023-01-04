import React, { useContext } from 'react';
import './overview.css';

import { auth, provider } from '../../../firebaseConfig';
import { Avatar, Box, Typography } from '@mui/material';

import { AppContext } from '../../../context/AppContext';

const Overview = () => {

  const { userDisplayName, userID, userEmail, userPhotoUrl, } = useContext(AppContext);

  const user = auth.currentUser;

  return (
    <Box>
      <Typography>{localStorage.getItem('name')}</Typography>
      <Typography>{localStorage.getItem('email')}</Typography>
      <Typography>{localStorage.getItem('id')}</Typography>
      <Typography>{localStorage.getItem('profilePic')}</Typography>
      <Avatar src={`${localStorage.getItem('profilePic')}`} />
    </Box>
  )
}

export default Overview