import { Box, Container, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Input } from '@mui/material';
import React, { useState } from 'react';
import './todolist.css';

import Modal from '@mui/material/Modal';

import DeleteIcon from '@mui/icons-material/Delete';
import { margin, width } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

import { Reorder } from "framer-motion";
import Item from './Item';

const initialItems = [];

// "🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuhjce", "🍅 Tofjymato", "🥒 Cufjyfcumber", "🧀 Chefgjfese", "🍅 Tomsdaato", "🥒 Cucuergermber", "🧀 Cheegergese", "🍅 Tomsvdsdaato", "🥒 Cucusdvergermber", "🧀 Cheegesdvsrgese",

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Todolist = () => {

  const [items, setItems] = useState(initialItems);
  const [todoValue, setTodoValue] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (data) => {
    setTodoValue(data);
  }

  const addTodo = () => {
    setItems(arr => [...arr, todoValue]);
    setOpen(false); 
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 64px)' }}>
      {/* <List
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', padding: '1rem', overflowY: 'scroll', }}>
        
      </List> */}
      <Toolbar className='todo-nav' sx={{ bgcolor: 'rgba(230,230,230,0.9)', transition: '0.7s', zIndex: '10' }}>
        <div className='logo'>

        </div>
        <div className='todo-nav-btn'>
          <IconButton onClick={handleOpen}>
            <AddIcon />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Typography>add todo</Typography>
              <Input
                value={todoValue}
                onChange={e => handleChange(e.target.value)}
                disableUnderline
              />
              <IconButton onClick={addTodo}>
                <AddIcon />
              </IconButton>
            </Box>
          </Modal>
        </div>
      </Toolbar>
      <Reorder.Group className='reorder' axis="y" onReorder={setItems} values={items} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', padding: '1rem', }}>
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </Reorder.Group>
    </Box>
  )
}

export default Todolist