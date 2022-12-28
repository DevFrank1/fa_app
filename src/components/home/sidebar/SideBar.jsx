import { Avatar, Box, Divider } from '@mui/material';
import React from 'react';
import './sidebar.css';

import { Sidebar, sidebarClasses, SubMenu, Menu, menuClasses, MenuItem } from 'react-pro-sidebar';

const SideBar = () => {
    return (
        <Box>
            <Sidebar rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'grey',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem'
                },
                height: '100%',
            }}>
                <Box>
                    <Avatar sx={{ width: '90px', height: '90px' }} />
                </Box>
                <Divider sx={{ height: '1.5px', width: '100%', bgcolor: 'yellow' }} />
                <Menu>
                    <MenuItem>Overview</MenuItem>
                    <SubMenu label='Activity'>
                        <MenuItem>Revenue</MenuItem>
                        <MenuItem>Expense</MenuItem>
                        <MenuItem>Profit</MenuItem>
                        <MenuItem>Net Profit</MenuItem>
                        <MenuItem>Analytics</MenuItem>
                    </SubMenu>
                    <MenuItem>Timeline</MenuItem>
                    <MenuItem>Calendar</MenuItem>
                    <MenuItem>Todo List</MenuItem>
                    <MenuItem>Pomodoro Timer</MenuItem>
                </Menu>
                <Divider sx={{ height: '1.5px', width: '100%', bgcolor: 'yellow' }} />
                <Menu rootStyles={{
                    [`.${menuClasses.container}`]: {

                    },
                    width: '100%',
                }}>
                    <MenuItem>Support</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SideBar