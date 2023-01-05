import { Box } from '@mui/material';
import React, { useState } from 'react';
import './calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuid } from 'uuid';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt('Enter');
    if (eventNamePrompt) {
      setEvents([...events, { start, end, title: eventNamePrompt, id: uuid() }])
    }
  }

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
        select={handleSelect}
        events={events}
      />
    </Box>
  )
}

export default Calendar