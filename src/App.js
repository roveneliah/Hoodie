import React from 'react';
import {useLoadScript} from "@react-google-maps/api"


import MapView from './MapView'

// A wrapper around our real app to load google api without extra calls
export default function App() {
  console.log('RELOAD MAPS API')
  // load google maps api, need to avoid extra API calls
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    // libraries: [] // add APIs like places & routes here
  })
  if(loadError)return"Error loading maps"
  if(!isLoaded)return"Loading maps"

  return <MapView />
}