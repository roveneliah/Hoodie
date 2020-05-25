import React from 'react'

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api"

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

export default function StandardMap(props) {
  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} /*options={options}*/> 
      {props.homes.map((home, index) => {

        let icons = ["/MarkerTrash.svg", "/MarkerNew.svg", "/MarkerLove.svg"];
        const marker = (
          <Marker
              // title={home.name}
              position={home.position}
              icon={{
                url: icons[home.status+1],
                scaledSize: new window.google.maps.Size(50,50)
              }}
              onClick={() => {
                console.log(`Set selected: ${index}`)
                props.setSelected(index)
              }}
            />
        )

        if (props.selected == null || props.homes[props.selected].position === home.position) {
          return marker
        } 
      })}

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
  )
}