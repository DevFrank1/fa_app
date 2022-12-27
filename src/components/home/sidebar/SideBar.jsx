import { Avatar, Box } from '@mui/material';
import React from 'react';
import './sidebar.css';

import { Sidebar, sidebarClasses, Menu, menuClasses, MenuItem } from 'react-pro-sidebar';

const SideBar = () => {
    return (
        <Box>
            <Sidebar rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'red',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                height: '100%',
            }}>
                <Box>
                    <Avatar/>
                </Box>
                <Menu>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Dashboard</MenuItem>
                </Menu>
                <Menu rootStyles={{
                [`.${menuClasses.container}`]: {
                    
                },
                width: '100%',
            }}>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Dashboard</MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SideBar