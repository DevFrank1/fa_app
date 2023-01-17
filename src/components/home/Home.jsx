import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import './home.css';

import { auth } from '../../firebaseConfig';

import { signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom";
import SideBar from './sidebar/SideBar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from './navbar/Navbar';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import Overview from './overview/Overview';
import TimeLine from './timeline/Timeline';
import Calendar from './calendar/Calendar';
import Todolist from './todolist/Todolist';
import NotFound from './notfound/NotFound';
import Activity from './activity/Activity';
import Tasks from './tasks/Tasks';

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
            <Box className='home' sx={{ display: 'flex', width: '100%', height: '100vh', }}>
                <SideBar />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', }}>
                    <Navbar />
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>Home</Typography>
                        <Button variant='contained' onClick={logOut}>Log out</Button>
                    </Box> */}
                    <Routes>
                        <Route path='overview' element={<Overview />} />
                        <Route path='activity' element={<Activity />} />
                        <Route path='tasks' element={<Tasks />} />
                        <Route path='timeline' element={<TimeLine />} />
                        <Route path='calendar' element={<Calendar />} />
                        <Route path='todolist' element={<Todolist />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Box>
            </Box>
        </ProSidebarProvider>
    )
}

export default Home