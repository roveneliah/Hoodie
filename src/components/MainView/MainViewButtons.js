import React from 'react';
import Fab from '@material-ui/core/Fab';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import FaceIcon from '@material-ui/icons/Face';

export default function MainViewButtons(props) {
  return (
    <div style={{position:'absolute', top:'5rem', left:'1rem', zIndex:5, display:'flex', flexDirection:'column'}}>
      <Fab 
        style={{backgroundColor: '#783BFF', color: 'white'}}
        onClick={() => {
          props.setListOpen(!props.listOpen)
        }}
      >
        <ViewCarouselIcon />
      </Fab>
      <Fab
        style={{backgroundColor: '#783BFF', color: 'white', marginTop:'1em'}}
        onClick={() => {props.setChatOpen(!props.chatOpen)}}  
      >
        <FaceIcon />
      </Fab>
    </div>
  )
}