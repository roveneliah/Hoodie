import React from 'react'

import ChatBubble from './ChatBubble'

import TextField from '@material-ui/core/TextField';

export default function ChatDisplay(props) {
  const [messageText, setMessageText] = React.useState('')

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
      <div style={{margin:'20px'}}>
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          defaultValue=''
          variant="outlined"
          value={messageText}
          fullWidth
          onChange={(event) => {setMessageText(event.target.value)}}
        />
      </div>
    </div>
    
      
  )
}