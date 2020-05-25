import React from 'react';

import MainViewButtons from './MainViewButtons'
import HomeListDrawer from './HomeListDrawer'
import ChatDrawer from './ChatDrawer';

export default function MainView(props) {

  // side drawer states
  const [listOpen, setListOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <>
      <MainViewButtons
        listOpen={listOpen}
        setListOpen={setListOpen}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />

      <HomeListDrawer
        homes={props.homes}
        listOpen={listOpen}
        setListOpen={setListOpen}
      />

      <ChatDrawer
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />
    </>
  )
}