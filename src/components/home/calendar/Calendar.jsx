import { Avatar, Box, IconButton, Input } from '@mui/material';
import React, { useState } from 'react';
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
  };

  const deleteEvent = (click) => {
    click.event.remove();
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

  const addData = () => {
    const { start, end } = eventInfo;
    setEvents([...events, { start, end, title: data, id: uuid() }]);
    setOpen(false);
  }

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
        height='100%'
        contentHeight='100%'
        editable
        selectable
        selectMirror
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