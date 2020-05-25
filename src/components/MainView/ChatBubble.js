import React from 'react'

import PersonIcon from '@material-ui/icons/Person';

export default function ChatBubble(props) {

  return (
    <div style={{
      display: 'flex',
      flexDirection: props.msg.agent ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      alignSelf: props.msg.agent ? 'flex-start' : 'flex-end',
      background: 'grey',
      width: '40%',
      padding: '10px',
      margin: '10px'
    }}>
      <PersonIcon style={{padding: '20px'}}/>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: props.msg.agent ? 'flex-start': 'flex-end'
      }}>
        <p style={{
          textAlign: props.msg.agent ? 'left' : 'right'
        }}>{props.msg.text}</p>
        <p style={{
          textAlign: props.msg.agent ? 'left' : 'right'
        }}>{props.msg.sender}</p>
      </div>
    </div>
  )
}