import React from 'react'

import ChatBubble from './ChatBubble'

import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';

const messages = [
  {
    sender: 'Michelle',
    agent: true,
    text: "Hi Nico, I just uploaded a few new spots after you thought Chelsea would be a good fit."
  },
  {
    sender: 'Nico',
    text: 'Thanks, I\'ll look through them and get back to you'
  }
]

export default function ChatDisplay(props) {
  const [messageText, setMessageText] = React.useState('')

  const sendMessage = (text) => {
    console.log(`send: ${JSON.stringify(text)}`)
    setMessageText('') // reset msg text
    messages.push({
      sender: props.user.name, // programmatic
      agent: props.user.agent,   // programmatic
      text: text
    })
  }

  const handleSubmit = (event) => {
    console.log(event.target.value)
  }

  return (
    // will be a scrollable view
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.map(msg => (
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