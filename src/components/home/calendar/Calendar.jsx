import { Box } from '@mui/material';
import React from 'react';
import './calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
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
      />
    </Box>
  )
}

export default Calendar