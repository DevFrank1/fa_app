import { Box, Container, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './todolist.css';

import Modal from '@mui/material/Modal';

import DeleteIcon from '@mui/icons-material/Delete';
import { margin, width } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

import Item from './Item';

import { db, auth } from '../../../firebaseConfig';
import { collection, addDoc, setDoc, doc, updateDoc, arrayUnion, getDoc, deleteDoc, getDocs } from '@firebase/firestore';

import { v4 as uuid } from 'uuid';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: '0.2rem 6rem',
  margin: `0.1rem`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: '100%',
  height: '100%'
});

const Todolist = () => {

  // const [items, setItems] = useState(getItems(10));

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
    // await addDoc(collection(db, `users/${localStorage.getItem('id')}/todo`), {
    //   name: `${todoValue}`,
    // });

    await updateDoc(doc(collection(db, `users/${localStorage.getItem('id')}/todo`), `done`), {
      files: arrayUnion({ id: `${uuid()}`, content: `${todoValue}` })
    }
    ).then(() => {
      const updatedItems = [...items, {
        id: `${uuid()}`, content: `${todoValue}`
      }];
      setItems(updatedItems);
    }).then(() => {
      setTodoValue('');
    });

    console.log(items);
    // getDataFromFireStore();
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
        ...doc.data(),
      }
    });
    setItems(newArray[0].files);
    console.log(newArray)
    // console.log(querySnapshot.data());
  }

  const deleteDataFromFirestore = async (dataId) => {
    await deleteDoc(doc(collection(db, `users/${localStorage.getItem('id')}/todo`), `${dataId}`));
    getDataFromFireStore();
  }

  useEffect(() => {
    // const docRef = doc(db, `users/${auth.currentUser.uid}/todo`)
    getDataFromFireStore();
  }, []);

  useEffect(() => {
    // const docRef = doc(db, `users/${auth.currentUser.uid}/todo`)
    updateFile();
  }, [items]);

  // useEffect(() => {
  //   // const docRef = doc(db, `users/${auth.currentUser.uid}/todo`)
  // }, [items])

  ///////////////////////////////

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  }

  const updateFile = async () => {

    // const doneTodoData = {
    //   items: [...items]
    // }

    console.log(items)

    await setDoc(doc(collection(db, `users/${localStorage.getItem('id')}/todo`), 'done'), {
      files: [...items]
    });

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
      {/* <Reorder.Group className='reorder' axis="y" onReorder={setItems} values={items} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%', padding: '1rem', }}>
        {items.map((item) => (
          <Item key={uuid()} item={item} deleteFunction={deleteDataFromFirestore} />
        ))}
      </Reorder.Group> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Item item={item} deleteFunction={deleteDataFromFirestore} />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>

            )
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default Todolist