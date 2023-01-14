import { Avatar, Box, IconButton, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuid } from 'uuid';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';

import { db, auth } from '../../../firebaseConfig';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc, deleteDoc, getDocs } from '@firebase/firestore';
import { async } from '@firebase/util';

import { format, compareAsc } from 'date-fns';

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

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = (info) => {
    setEventInfo(info);
    setOpen(true);
    console.log(info)
  };

  const deleteEvent = (click) => {
    deleteEventFromFirestore(click.event.id);
  }

  function renderDayViewDetail(event) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Avatar sx={{ width: '11px', height: '11px', bgcolor: '#ff1122', color: '#ff1122', m: '0 0.5rem' }} />
        <Typography mr='0.5rem' variant='h6' fontSize='14px'>{event.timeText}</Typography>
        <Typography variant='h6' fontSize='14px'>{event.event.title}</Typography>
      </Box>
    )
  }

  const handleClose = () => {
    setOpen(false);
    setData('');
  };

  const [data, setData] = useState('');

  const handleChange = (b) => {
    setData(b);
  }

  // const addNewData = (info) => {
  //   const { start, end } = info;
  //   handleOpen().then(() => {
  //     return (
  //       <Modal
  //         open={open}
  //         onClose={handleClose}
  //       >
  //         <Box sx={style}>
  //           <Typography>add calendar</Typography>
  //           <Input
  //             value={data}
  //             onChange={e => handleChange(e.target.value)}
  //             disableUnderline
  //           />
  //           <IconButton onClick={addData}>
  //             <AddIcon />
  //           </IconButton>
  //         </Box>
  //       </Modal>
  //     )
  //   }).then(() => {
  //     setEvents([...events, { start, end, title: data, id: uuid() }]);
  //   }).then(() => {
  //     setOpen(false);
  //     setData('');
  //   })
  // }

  const addData = async () => {
    const { startStr, endStr } = eventInfo;
    // setEvents([...events, { start, end, title: data, id: uuid() }]);
    const autoId = uuid();
    await setDoc(doc(collection(db, `users/${localStorage.getItem('id')}/events`), autoId), {
      start: `${startStr}`,
      end: `${endStr}`,
      title: data,
      id: autoId,
    });
    setOpen(false);
    getEventFromFireStore();
  }

  const getEventFromFireStore = async () => {
    setEvents([]);
    const querySnapshot = await getDocs(collection(db, `users/${localStorage.getItem('id')}/events`));
    // querySnapshot.forEach((doc) => {
    //   setItems(aff => [...aff, doc.data().name]);
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data().name);
    // });
    const newArray = querySnapshot.docs.map((doc) => {
      var obj = {
        start: doc.data().start,
        end: doc.data().end,
        title: doc.data().title,
        id: doc.data().id,
      }
      return obj;
    });
    setEvents(newArray);
    console.log(newArray)
    // console.log(querySnapshot.data());
  }

  const deleteEventFromFirestore = async (dataId) => {
    await deleteDoc(doc(collection(db, `users/${localStorage.getItem('id')}/events`), `${dataId}`));
    getEventFromFireStore();
  }

  const handleEventDrop = async (info) => {
    await updateDoc(doc(collection(db, `users/${localStorage.getItem('id')}/events`), info.event.id), {
      start: info.event.startStr,
    })
  }

  useEffect(() => {
    getEventFromFireStore();
  }, [])


  // const handleSelect = (info) => {
  //   const { start, end } = info;
  //   // const eventNamePrompt = prompt('Enter');
  //   handleOpen();
  //   if (eventNamePrompt) {
  //     setEvents([...events, { start, end, title: eventNamePrompt, id: uuid() }])
  //   }
  // }

  return (
    <Box sx={{ display: 'block', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '1rem' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        validRange={{
          start: format(new Date(), 'yyyy-MM-dd')
        }}
        height='100%'
        contentHeight='100%'
        editable
        selectable
        selectMirror
        eventDrop={handleEventDrop}
        select={handleOpen}
        events={events}
        eventClick={deleteEvent}
        eventContent={renderDayViewDetail}
      />
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography>add calendar</Typography>
          <Input
            value={data}
            onChange={e => handleChange(e.target.value)}
            disableUnderline
          />
          <IconButton onClick={addData}>
            <AddIcon />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  )
}

export default Calendar