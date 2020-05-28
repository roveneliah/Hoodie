import React from 'react'

import { Marker } from "@react-google-maps/api"

export default function Markers(props) {

  return props.homes.map((home, index) => {
    const icons = ["/MarkerTrash.svg", "/MarkerNew.svg", "/MarkerLove.svg"];
    const status = props.statuses[home.name] 
    const marker = (
      <Marker
        // title={home.name}
        position={home.position}
        icon={{
          url: icons[status+1],
          scaledSize: new window.google.maps.Size(50,50)
        }}
        onClick={() => {
          console.log(`Set selected: ${props.selected}`)
          props.setSelected(index)
        }}
      />
    )

    if (props.selected == null || props.homes[props.selected].position === home.position) {
      return marker
    }
  })
}