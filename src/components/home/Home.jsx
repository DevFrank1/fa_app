import { Box, Button, Typography } from '@mui/material'
import React, {useEffect} from 'react';

import { auth } from '../../firebaseConfig';

import { signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem('name', '');
            localStorage.setItem('email', '');
            localStorage.setItem('profilePic', '');
            console.log('logout successfully');
        }).then(() => {
            navigate('/');
        }).catch(() => {
            console.log('error');
        })
    }

    useEffect(() => {
        console.log('logout');
    }, []);

    return (
        <Box>
            <Typography>Home</Typography>
            <Button variant='contained' onClick={logOut}>Log out</Button>
        </Box>
    )
}

export default Home