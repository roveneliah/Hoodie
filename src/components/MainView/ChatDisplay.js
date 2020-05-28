import React from 'react'

import ChatBubble from './ChatBubble'

import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';

export default function ChatDisplay(props) {
  const [messageText, setMessageText] = React.useState('')

  const sendMessage = (text) => {
    console.log(`send: ${JSON.stringify(text)}`)
    setMessageText('') // reset msg text
    props.sendMessage(text)
  }

  return (
    // will be a scrollable view
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        {props.messages.map(msg => (
          <ChatBubble
            msg={msg}
          />
        ))}
      </div>
      {/* text entry goes here */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
      }}>
          <TextField
            id="outlined-textarea"
            label="Message"
            multiline
            // rows={4}
            defaultValue=''
            variant="outlined"
            value={messageText}
            fullWidth
            onChange={(event) => {setMessageText(event.target.value)}}
          />
          <Fab onClick={() => {sendMessage(messageText)}}>
            Send
          </Fab>
      </div>
    </div>
    
      
  )
}