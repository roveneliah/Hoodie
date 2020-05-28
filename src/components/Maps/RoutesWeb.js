import React from 'react'

import {
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api"

const transitModes = ['WALKING', 'DRIVING']
const renderMode = 'WALKING' // which one to render

export default function RoutesWeb(props) {
  const directionsCallback = (response, transitMode) => {
    if (response !== null) {
      if (response.status === 'OK') {
        const to = response.request.destination.query
        const from = props.homes[props.selected].name

        const clone = {...props.routes}
        if (!props.routes[to][from]) {
          clone[to][from] = {[transitMode]: response}
          props.setRoutes(clone)
        }
        else if (!props.routes[to][from][transitMode]) { // if response doesn't exist
          clone[to][from][transitMode] = response // overwriting the other one
          props.setRoutes(clone)
        }
        // console.log(clone[to][from][transitMode].routes[0].legs[0].duration.text)
        // console.log(`Got route ${to} ${from} ${transitMode}`)
      } else {
        console.log('response: ', response)
      }
    }
  }

  const getDirections = (to, from, transitMode) => {
    console.log(`No route found for: ${to} ${from}`)
    const fromCoord = props.homes[props.selected].position
    if (!props.routes[to][from] || Object.keys(props.routes[to][from]).length === 0 || !props.routes[to][from][transitMode]) { // only call this if we haven't made a request
      console.log(`Calling API from ${from} ${to} ${transitMode}`)
      return (
        <DirectionsService
          // required
          options={{
            destination: to,
            origin: fromCoord,
            travelMode: transitMode,
            // provideRouteAlternatives: true,
          }}
          // required
          callback={(response)=>directionsCallback(response, transitMode)}
        />
      )
    }
  }

  const renderDirections = (route, transitMode) => {
    if (transitMode == renderMode)
      return (
        <DirectionsRenderer
        options={{
          directions: route[transitMode]
        }}
        // routeIndex={i}
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

  return (
    // render routes from selected
    props.selected !== null && Object.keys(props.routes).map((to, i) => {
      const from = props.homes[props.selected].name
      const route = props.routes[to][from]

      // for each transit mode, check if that routes exists
      return transitModes.map(transitMode => {
        const routeExists = route && route[transitMode]
        return routeExists ? 
                renderDirections(route, transitMode)
                : getDirections(to, from, transitMode)
      })
    })
  )
}