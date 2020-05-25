import React from 'react'

import ChatDisplay from './ChatDisplay'

import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function ChatDrawer(props) {
  return (
    <Drawer
        variant='temporary'
        anchor='right'
        open={props.chatOpen}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          margin: "20px",
        }}>
          <div>
            <h1 style={{color:'#783BFF'}}>Chat</h1>
            <p style={{color:'#783BFF'}}>Michelle</p>
          </div>
          <div>
            <p style={{color:'#783BFF'}}>+1 917-412-8364</p>
            <p style={{color:'#783BFF'}}>michelle@brokers.nyc</p>
            
          </div>
        </div>
        <Fab
          style={{
            'backgroundColor': '#783BFF',
            'color': 'white',
            'margin': '20px'
          }}
          onClick={() => {props.setChatOpen(false)}}
        >
          <ArrowBackIcon />
        </Fab>
        <ChatDisplay />
      </Drawer>
  )
}