import React from 'react'

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService
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

const routesinit = {
  "Times Square": {},
  'whitney museum': {},
  'madison square garden': {},
  'the MET': {}
}

export default function StandardMap(props) {
  const [routes, setRoutes] = React.useState(routesinit) // responses
  const [requests, setRequests] = React.useState(routesinit) // keep track of requests to avoid pinging API over and over

  // indicate that we've made a directions api request
  const madeRequest = (to) => {
    let clone = {...requests}
    const from = props.homes[props.selected].name
    clone[to] = {[from]: true}
    // setRequests(clone) // infinite looop ?!!?!
  }

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        const to = response.request.destination.query
        const from = props.homes[props.selected].name
        if (!routes[to][from]) { // if response doesn't exist
          let clone = {...routes}
          clone[to][from] = response
          setRoutes(clone)
        }
      } else {
        console.log('response: ', response)
      }
    }
  }

  return (
    <>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} options={options}> 
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
                  console.log(`Set selected: ${home.name}`)
                  props.setSelected(index)
                }}
              />
          )

          if (props.selected == null || props.homes[props.selected].position === home.position) {
            return marker
          } 
        })}

        {/* get directions */}
        {
          props.selected !== null && Object.keys(routes).map(to => {
            // only call api if we haven't requested this route
            const fromCoord = props.homes[props.selected].position
            const from = props.homes[props.selected].name
            if (Object.keys(routes[to]).length === 0) { // only call this if we haven't made a request
              madeRequest(to) // indicate we made this call to avoid hitting API again
              return (
                <DirectionsService
                  // required
                  options={{
                    destination: to,
                    origin: fromCoord,
                    travelMode: 'DRIVING'
                  }}
                  // required
                  callback={directionsCallback}
                />
              )
            }
          })
        }
        
        {/* render responses */}
        {
          // props.selected && Object.keys(responses).map((destination, i) => {
          props.selected !== null && Object.keys(routes).map((to, i) => {
            const from = props.homes[props.selected].name
            const route = routes[to][from]
            if (route) {
              return (
                <DirectionsRenderer
                  options={{
                    directions: route
                  }}
                  routeIndex={i}
                />
              )
            }
          })
        }

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
}