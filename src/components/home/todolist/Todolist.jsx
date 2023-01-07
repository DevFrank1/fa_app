import { Box, Container, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './todolist.css';

import Modal from '@mui/material/Modal';

import DeleteIcon from '@mui/icons-material/Delete';
import { margin, width } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

import { Reorder } from "framer-motion";
import Item from './Item';

import { db, auth } from '../../../firebaseConfig';
import { collection, addDoc, setDoc, doc, getDoc, deleteDoc, getDocs } from '@firebase/firestore';

import { v4 as uuid } from 'uuid';

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

  const [items, setItems] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const [item, setItem] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTodoValue('');
  };

  const handleChange = (data) => {
    setTodoValue(data);
  }

  const addTodo = async () => {
    // setItems(arr => [...arr, todoValue]);
    setOpen(false);
    await addDoc(collection(db, `users/${localStorage.getItem('id')}/todo`), {
      name: `${todoValue}`,
    });
    setTodoValue('');
    getDataFromFireStore();
  }

  const getDataFromFireStore = async () => {
    setItems([]);
    const querySnapshot = await getDocs(collection(db, `users/${localStorage.getItem('id')}/todo`));
    // querySnapshot.forEach((doc) => {
    //   setItems(aff => [...aff, doc.data().name]);
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data().name);
    // });
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    });
    setItems(newArray);
    // console.log(querySnapshot.data());
  }

  // const deleteDataFromFirestore = async (dataId) => {
  //   await deleteDoc(doc(collection(db, `users/${localStorage.getItem('id')}/todo`), `${dataId}`));
  // }

  useEffect(() => {
    // const docRef = doc(db, `users/${auth.currentUser.uid}/todo`)
    getDataFromFireStore();
  }, []);

  // useEffect(() => {
  //   // const docRef = doc(db, `users/${auth.currentUser.uid}/todo`)
  // }, [items])


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
          <Item key={uuid()} item={item} />
        ))}
      </Reorder.Group>
    </Box>
  )
}

export default Todolist