import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import './home.css';

import { auth } from '../../firebaseConfig';

import { signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom";
import SideBar from './sidebar/SideBar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from './navbar/Navbar';

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
        <ProSidebarProvider>
            <Box className='home' sx={{ display: 'flex', width: '100%', height: '100%', }}>
                <SideBar />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', }}>
                    <Navbar />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>Home</Typography>
                        <Button variant='contained' onClick={logOut}>Log out</Button>
                    </Box>
                </Box>
            </Box>
        </ProSidebarProvider>
    )
}

export default Home