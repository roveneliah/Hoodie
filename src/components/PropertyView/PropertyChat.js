import React from 'react'

import ChatDisplay from '../MainView/ChatDisplay'


const propertyMessagesLoaded = [
  {
    sender: 'Angela',
    agent: true,
    text: "Hi Nico, I just uploaded a few new spots after you thought Chelsea would be a good fit."
  },
  {
    sender: 'Nico',
    text: 'Thanks, I\'ll look through them and get back to you'
  }
]

export default function PropertyChat(props) {

  return (
    <div>
      <ChatDisplay user={props.user} />
    </div>
  )
}