import React from 'react'
import { pure } from 'recompose';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api"

import mapStyles from "../../mapStyles"
import routesInit from '../../routes'

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

// const routesinit = {
//   "Times Square": {},
//   'whitney museum': {},
//   'madison square garden': {},
//   'the MET': {}
// }

const StandardMap = pure((props) => {

  console.log('RELOAD MAP VIEW')

  const routes = props.routes
  const setRoutes = props.setRoutes

  // indicate that we've made a directions api request
  const madeRequest = (to) => {
    // let clone = {...requests}
    // const from = props.homes[props.selected].name
    // clone[to] = {[from]: true}
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
          console.log(clone[to][from].routes[0].legs[0].duration.text)
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
        })}

        {/* get directions */}
        {
          props.selected !== null && Object.keys(routes).map(to => {
            // only call api if we haven't requested this route
            const fromCoord = props.homes[props.selected].position
            const from = props.homes[props.selected].name
            if (!routes[to][from] || Object.keys(routes[to][from]).length === 0) { // only call this if we haven't made a request
              madeRequest(to) // indicate we made this call to avoid hitting API again
              // console.log(`Calling API from ${from} ${to}`)
              return (
                <DirectionsService
                  // required
                  options={{
                    destination: to,
                    origin: fromCoord,
                    travelMode: 'DRIVING',
                    // provideRouteAlternatives: true,
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
                  // panel=???? how does this work?
                  // options={{
                  //   // suppressMarkers: true,
                  //   // icon: {scale: 3}
                  //   // polylineOptions: {
                  //   //   // map: map,
                  //   //   strokeColor: "#2249a3",
                  //   //   strokeOpacity: 0.9 ,
                  //   //   strokeWeight: 12,
                  //   //   // z-index: 99
                  //   // }
                  // }}
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
})

export default StandardMap