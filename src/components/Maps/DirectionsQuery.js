import React from 'react'

import { DirectionsService } from "@react-google-maps/api"

export default function DirectionsQuery(props) {
  console.log(`Directions Query`)

  const directionsCallback = (response) => {
    console.log(`directions callback`)
    if (response !== null) {
      if (response.status === 'OK') {
        const to = response.request.destination.query
        const from = props.homes[props.selected].name // TODO: what is from now?
        if (!props.routes[to][from]) { // if response doesn't exist
          let clone = {...props.routes}
          clone[to][from] = response
          console.log(clone[to][from].routes[0].legs[0].duration.text)
          props.setRoutes(clone)
        }
      } else {
        console.log('response: ', response)
      }
    }
  }

  return (
    <>
      {
        // for each route to
        Object.keys(props.routes).map(to => {
          // for each home from
          props.homes.map(home => {
            // only call api if we haven't requested this route
            const fromCoord = home.position
            const from = home.name
            if (!props.routes[to][from] || Object.keys(props.routes[to][from]).length === 0) { // only call this if we haven't made a request
              console.log(`Calling API from ${JSON.stringify(from)} ${to}`)
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
        })
      }
    </>
  )
}