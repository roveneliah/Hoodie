import React from 'react';
import {useLoadScript} from "@react-google-maps/api"
import homesInit from './homes'

import MainView from './components/MainView/MainView'
import PropertyView from './components/PropertyView/PropertyView'
import StandardMap from './components/Maps/StandardMap';

export default function App() {
  console.log('RELOAD MAPS API')
  // load google maps api, need to avoid extra API calls
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    // libraries: [] // add APIs like places & routes here
  })
  
  // which home is selected, null if none
  // better name? 
  const [selected, setSelected] = React.useState(null);
  const [homes, setHomes] = React.useState(homesInit)
  const [galleryOpen, setGalleryOpen] = React.useState(false)

  // check api loaded correctly
  if(loadError)return"Error loading maps"
  if(!isLoaded)return"Loading maps"

  return (
    <div>
      <StandardMap
        homes={homes}
        selected={selected}
        setSelected={setSelected}
      />

      {/* give method to change the state of the marker */}
      {selected != null ? (
        <PropertyView
          home={homes[selected]}
          selected={selected}
          setSelected={setSelected}
          updateHomeStatus={(status) => {
            // so fucking ugly, shoot me now please
            // what is going on here?
            // why do I have to map it?
            // should I just use some copy method
            let newHomes = homes
            newHomes[selected].status = status
            setHomes(newHomes.map(home => home))
          }}
        />
      ) : (
        <MainView
          homes={homes}
        />
      )}
    </div>
  )
}