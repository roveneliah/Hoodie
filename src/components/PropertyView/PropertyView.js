import React from 'react';

import PropertyViewButtons from './PropertyViewButtons'
import Carousel from './Carousel'
import Spots from './Spots'
import PropertyNotes from './PropertyNotes'
import PropertyChat from './PropertyChat'

import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function PropertyView(props) {
  const [galleryOpen, setGalleryOpen] = React.useState(false)
  const [drawerView, setDrawerView] = React.useState('spots')

  const view = {
    'spots': (
      <Spots spots={props.spots} />
    ),
    'notes': (
      <PropertyNotes notes={props.note} setNotes={props.updateHomeNotes} />
    ),
    'chat': (
      <PropertyChat user={props.user} />
    )
  }

  return (
    <>
      <PropertyViewButtons
        setSelected={props.setSelected}
        openGallery={() => { setGalleryOpen(true) }}
      />

      <Carousel
        images={props.home.images}
        open={galleryOpen}
        close={() => { setGalleryOpen(false) }} 
      />

      <Drawer
        variant="permanent"
        anchor="right"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: "20px"
          }}>
            <div>
              <h1 style={{color:'#783BFF'}}>{props.home.name}</h1>
              <p style={{color:'#783BFF'}}>${props.home.cost}</p>
              <p style={{color:'#783BFF'}}>{props.home.bed} bed</p>
              <p style={{color:'#783BFF'}}>{props.home.bath} bath</p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <Fab
                style={{
                  'backgroundColor': props.status === 1 ? 'black' : 'red',
                  'color': 'white'
                }}
                onClick={() => {
                  let newStatus = props.status === 1 ? null : 1
                  console.log(`newStatus: ${newStatus}`)
                  console.log(props.status)
                  console.log(props.status === 1)
                  props.updateHomeStatus(newStatus)
                }}
              >
                <FavoriteBorderIcon />
              </Fab>
              <Fab
                style={{
                  'backgroundColor': props.status === -1 ? 'black' : 'orange',
                  'color': 'white'
                }}
                onClick={() => {
                  let newStatus = props.status === -1 ? null : -1
                  props.updateHomeStatus(newStatus)
                }}
              >
                <DeleteOutlineIcon />
              </Fab>
            </div>
          </div>
          {/* <div>
            <p style={{color:'#783BFF'}}>{props.home.agentNotes}</p>
          </div> */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              {['Spots', 'Notes', 'Chat'].map(buttonText => (
                <Fab
                  variant="extended"
                  onClick={() => {setDrawerView(buttonText.toLowerCase())}}
                  style={
                    buttonText.toLowerCase() === drawerView ? {
                      backgroundColor: '#783BFF',
                      color: 'white'
                    } : null
                  }>
                  {buttonText}
                </Fab>
              ))}
            </div>
            {view[drawerView]} 
          </div>
        </div>
        
        
      </Drawer>
    </>
  )
}

