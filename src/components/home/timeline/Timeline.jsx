import { Box } from '@mui/material';
import React from 'react';
import './timeline.css';

import { Timeline } from 'rsuite';

import AcUnitIcon from '@mui/icons-material/AcUnit';


const TimeLine = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '1rem' }}>
      <Timeline align='left'>
        <Timeline.Item dot={<AcUnitIcon />}>16:27:41 Your order starts processing</Timeline.Item>
        <Timeline.Item>16:28:43 Your order to be ready for delivery</Timeline.Item>
        <Timeline.Item>16:28:45 Your parcel has been out of the library</Timeline.Item>
        <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
        <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
      </Timeline>
    </Box>
  )
}

export default TimeLine