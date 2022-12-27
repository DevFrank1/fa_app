import React from 'react';
import './navbar.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';

const Navbar = () => {
    return (
        <Box sx={{ 
            // flexGrow: 1
             }}>
            {/* previously, it is static */}
            <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                <Toolbar className='navbar' id="back-to-top-anchor" sx={{ bgcolor: 'rgba(255,255,255,0.9)', transition: '0.7s', zIndex: '10' }}>
                    <div className='navbar-logo'>
                        
                    </div>
                    <div className='navbar-btn'>
                        <IconButton className='button' aria-label='fingerprint'>
                            <LightModeOutlinedIcon sx={{ width: '20px', height: '20px' }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar