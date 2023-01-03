import { Box, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import './todolist.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { margin, width } from '@mui/system';

import { Reorder } from "framer-motion";
import Item from './Item';

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuhjce", "🍅 Tofjymato", "🥒 Cufjyfcumber", "🧀 Chefgjfese", "🍅 Tomsdaato", "🥒 Cucuergermber", "🧀 Cheegergese", "🍅 Tomsvdsdaato", "🥒 Cucusdvergermber", "🧀 Cheegesdvsrgese",];


const Todolist = () => {

  const [items, setItems] = useState(initialItems);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 64px)', padding: '1rem 1rem 0rem 1rem' }}>
      {/* <List
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', padding: '1rem', overflowY: 'scroll', }}>
        
      </List> */}
      <Reorder.Group className='reorder' axis="y" onReorder={setItems} values={items} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', padding: '1rem', }}>
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </Reorder.Group>
    </Box>
  )
}

export default Todolist