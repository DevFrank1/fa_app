import { Box, Container, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './tasks.css';

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';

import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { margin, width } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

import { db, auth } from '../../../firebaseConfig';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc, arrayUnion, deleteDoc, getDocs } from '@firebase/firestore';

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
  { id: uuid(), content: "six task" },
  { id: uuid(), content: "seven task" },
  { id: uuid(), content: "eight task" },
  { id: uuid(), content: "nine task" },
  { id: uuid(), content: "ten task" },
];

const columnsFromBackend = {
  requested: {
    name: "Requested",
    items: itemsFromBackend
  },
  todo: {
    name: "To do",
    items: []
  },
  inprogress: {
    name: "In Progress",
    items: []
  },
  done: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

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

const Tasks = () => {
  const [columns, setColumns] = useState({});

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

  const addTask = async () => {
    // setItems(arr => [...arr, todoValue]);
    setOpen(false);
    // await addDoc(collection(db, `users/${localStorage.getItem('id')}/tasks`), {
    //   name: `${todoValue}`,
    // });
    await updateDoc(doc(collection(db, `users/${localStorage.getItem('id')}/tasks`), 'done'), {
      items: arrayUnion({ id: '12wqdwqdw345', content: 'laargqwddqwqe task' })
    });
    setTodoValue('');
    getDataFromFireStore();
  }

  const getDataFromFireStore = async () => {
    setColumns([]);
    const querySnapshot = await getDocs(collection(db, `users/${localStorage.getItem('id')}/tasks`));
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
    setColumns(newArray);
    // console.log(querySnapshot.data());
  }

  useEffect(() => {
    // const docRef = doc(db, `users/${auth.currentUser.uid}/todo`)
    getDataFromFireStore();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', }}>
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
              <Typography>add task</Typography>
              <Input
                value={todoValue}
                onChange={e => handleChange(e.target.value)}
                disableUnderline
              />
              <IconButton onClick={addTask}>
                <AddIcon />
              </IconButton>
            </Box>
          </Modal>
        </div>
      </Toolbar>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '1rem' }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </Box>
    </Box>
  )
}

export default Tasks