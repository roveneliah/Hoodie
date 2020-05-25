import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function PropertyViewButtons(props) {
  return (
    <div style={{position:'absolute', top:'5rem', left:'1rem', zIndex:5, display:'flex', flexDirection:'column'}}>
        <Fab 
          style={{backgroundColor: '#783BFF', color: 'white'}}
          onClick={() => {
            props.setSelected(null)
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <Fab
          style={{backgroundColor: '#783BFF', color: 'white', marginTop:'1em'}}
          onClick={props.openGallery}
        >
          <DashboardIcon />
        </Fab>
      </div>
  )
}