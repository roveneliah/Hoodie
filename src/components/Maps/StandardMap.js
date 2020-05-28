import React from 'react'
import { pure } from 'recompose';

import { GoogleMap } from "@react-google-maps/api"

import RoutesWeb from './RoutesWeb'
import Markers from './Markers'

import mapStyles from "../../mapStyles"

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const center = {
  lat: 40.758896,
  lng: -73.985130
}
const options = {
  styles: mapStyles
}

const StandardMap = pure((props) => {
  console.log('RELOAD MAP VIEW')
  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} options={options}> 
        {/* render markers */}
        <Markers
          homes={props.homes}
          statuses={props.statuses}
          selected={props.selected}
          setSelected={props.setSelected}
        />

        {/* render responses */}
        <RoutesWeb
          selected={props.selected}
          homes={props.homes}
          routes={props.routes}
          setRoutes={props.setRoutes}
        />
        

        {/* SHOW INFO WINDOW */}
        {/* { selected ? (
          <InfoWindow position={{lat: selected.position.lat, lng: selected.position.lng}} onCloseClick={
            () => {setSelected(null)}
          }>
            <div>
              <h2>{selected.name}</h2>
            </div>
          </InfoWindow>
        ) : null} */}
      </GoogleMap>
    </>
  )
})

export default StandardMap