import React from 'react'

export default function Spots(props) {
  // should render spots based on routes
  return (
    <div>
      {props.spots.map(spot => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: '20px',
          padding: '10px',
          color: 'white',
          backgroundColor: 'grey'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <p>{spot.name}</p>
            <p>{spot.address}</p>
          </div>
          <div>
            <p>{spot.driving} drive</p>
            <p>{spot.walking} walk</p>
            {/* <p>{spot.transit} transit</p>
            <p>{spot.bicycling} biking</p> */}
          </div>
        </div>
      ))}
    </div>
  )
}