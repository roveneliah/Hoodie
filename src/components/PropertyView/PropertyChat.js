import React from 'react'

import ChatDisplay from '../MainView/ChatDisplay'

export default function PropertyChat(props) {

  return (
    <div>
      <ChatDisplay
        user={props.user}
        messages={props.messages} 
        sendMessage={props.sendMessage}
      />
    </div>
  )
}