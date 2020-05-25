import React from 'react';

import PropertyViewButtons from './PropertyViewButtons'
import Carousel from './Carousel'

import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


export default function PropertyView(props) {
  // const classes = useStyles();

  const [galleryOpen, setGalleryOpen] = React.useState(false)

  return (
    <>
      <PropertyViewButtons
        setSelected={props.setSelected}
        openGallery={() => { setGalleryOpen(true) }}
      />

      <Carousel 
        open={galleryOpen}
        close={() => { setGalleryOpen(false) }} 
      />

      <Drawer
        variant="permanent"
        anchor="right"
      >
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
            {/* <div style={{width:'50%'}}>
              <p style={{color:'#783BFF'}}>{props.home.agentNotes}</p>
            </div>
             */}

          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Fab
              style={{
                'backgroundColor': props.home.status === 1 ? 'black' : 'red',
                'color': 'white'
              }}
              onClick={() => {
                let newStatus = props.home.status === 1 ? null : 1
                props.updateHomeStatus(newStatus)
              }}
            >
              <FavoriteBorderIcon />
            </Fab>
            <Fab
              style={{
                'backgroundColor': props.home.status === -1 ? 'black' : 'orange',
                'color': 'white'
              }}
              onClick={() => {
                let newStatus = props.home.status === -1 ? null : -1
                props.updateHomeStatus(newStatus)
              }}
            >
              <DeleteOutlineIcon />
            </Fab>
          </div>
        </div>
      </Drawer>
    </>
  )
}

