import React from 'react'

import MainView from './components/MainView/MainView'
import PropertyView from './components/PropertyView/PropertyView'
import StandardMap from './components/Maps/StandardMap';
// import DirectionsQuery from './components/Maps/DirectionsQuery'

import homesInit from './homes'
import routesInit from './routes'

// const loadedNotes = homesInit.map(home => home.notes)
const loadedNotes = homesInit.reduce((notes, home) => {
  notes[home.name] = home.notes
  return notes
}, {})

// const loadedStatuses = homesInit.map(home => home.statuses)
const loadedStatuses = homesInit.reduce((statuses, home) => {
  statuses[home.name] = home.status
  return statuses
}, {})


// manually set user for now
const user = {
  name: "Nico",
  agent: false
}


export default function MapView(props) {
  const [selected, setSelected] = React.useState(null);
  const [homes, setHomes] = React.useState(homesInit);
  const [notes, setNotes] = React.useState(loadedNotes);
  const [statuses, setStatuses] = React.useState(loadedStatuses)
  const [routes, setRoutes] = React.useState(routesInit) // responses, we want these right away

  // return the commute time from selected property
  const getCommute = (spot, transitMode) => (
    // if route loaded, get ETA of [transitMode]
    Object.keys(routes[spot]).length !== 0
      && routes[spot][homes[selected].name]
      && routes[spot][homes[selected].name][transitMode]
      ? routes[spot][homes[selected].name][transitMode].routes[0].legs[0].duration.text 
      : null
  )

  return (
    <div>
      {/* make queries at top level rather than on demand */}
      {/* allow us to use distance features without going into property view */}
      {/* <DirectionsQuery
        homes={homes}
        routes={routes} // get routes from all the homes
        setRoutes={setRoutes}
      /> */}

      <StandardMap
        homes={homes}
        selected={selected}
        setSelected={setSelected}
        statuses={statuses}
        routes={routes}
        setRoutes={setRoutes}
      />

      {/* give method to change the state of the marker */}
      {selected != null ? (
        <PropertyView
          user={user}
          spots={Object.keys(routes).map((spot) => ({
            name: spot,
            // check if loaded
            driving: getCommute(spot, 'DRIVING'),
            walking: getCommute(spot, 'WALKING')
          }))}
          home={homes[selected]}
          note={notes[homes[selected].name]}
          updateHomeNotes={(text) => {
            let updated = {...notes}
            updated[homes[selected].name] = text // selected is an index not a home name
            setNotes(updated)
          }}
          selected={selected}
          setSelected={setSelected}
          status={statuses[homes[selected].name]}
          updateHomeStatus={(status) => {
            let updated = {...statuses}
            updated[homes[selected].name] = status
            setStatuses(updated)
          }}
          
        />
      ) : (
        <MainView
          user={user}
          homes={homes}
        />
      )}
    </div>
  )
}