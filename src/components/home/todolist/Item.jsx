import React from 'react';
import { Box, Container, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { useMotionValue, Reorder } from "framer-motion";
import { useRaisedShadow } from "./Shadow.jsx";


const Item = ({ item }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    return (
        <Reorder.Item value={item} id={item} style={{
            listStyle: 'none',
            width: '100%',
            margin: '0.2rem',
        }} >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.2rem',
                    bgcolor: '#aaaaaa',
                    width: '100%',
                    borderRadius: '15px',
                    '&:hover': {
                        bgcolor: '#baff23',
                        scale: '1.01',
                        boxShadow: '0 2px 5px 2px rgba(100, 100, 100, 0.1)',
                        zIndex: '5',
                        transition: '250ms'
                    }
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Checkbox edge='start' sx={{ mr: '1rem' }} />
                    <Typography sx={{ textDecoration: 'line-through', }}>{item}</Typography>
                </Box>
                <IconButton edge='end'>
                    <DeleteIcon />
                </IconButton>
            </Container>
        </Reorder.Item >
    )
}

export default Item