import React from 'react'

import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function HomeListDrawer(props) {

  const [activeTag, setActiveTag] = React.useState(null)
  const [filter, setFilter] = React.useState(null)

  // Return list of all tags across homes
  const getTags = () => {
    return props.homes.reduce((tags, home) => {
      tags.push(...home.tags)
      return tags
    }, [])
  }

  return (
    <Drawer
        variant='temporary'
        anchor='right'
        open={props.listOpen}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: "20px"
        }}>
          <div>
            <h1 style={{color:'#783BFF'}}>Homes</h1>
            <p style={{color:'#783BFF'}}>search by</p>
            
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Fab
              style={{
                'backgroundColor': filter === 1 ? 'black' : 'red',
                'color': 'white'
              }}
              onClick={() => {
                console.log(`before: ${filter}`)
                setFilter(filter === 1 ? null : 1)
                console.log(`after: ${filter}`)
              }}
            >
              <FavoriteBorderIcon />
            </Fab>
            <Fab
              style={{
                'backgroundColor': filter === -1 ? 'black' : 'orange',
                'color': 'white'
              }}
              onClick={() => {
                console.log(`before: ${filter}`)
                setFilter(filter === -1 ? null : -1)
                console.log(`after: ${filter}`)
              }}
            >
              <DeleteOutlineIcon />
            </Fab>
            <Fab
              style={{
                'backgroundColor': '#783BFF',
                'color': 'white'
              }}
              onClick={() => {props.setListOpen(false)}}
            >
              <ArrowBackIcon />
            </Fab>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginLeft:'20px',
          marginRight:'20px'
        }}>
          {getTags().map(tag => (
            <Fab
              variant='extended'
              style={{
                backgroundColor: activeTag === tag ? 'orange' : '#783BFF',
                color:'white',
              }}
              onClick={() => {
                if (activeTag === tag) setActiveTag(null)
                else setActiveTag(tag)
              }}>
                  {tag}
            </Fab>
          ))}
        </div>
        <div>
          {props.homes.map(home => {
            let icons = ["/MarkerTrash.svg", "/MarkerNew.svg", "/MarkerLove.svg"];
            let matchesFilter = !filter || home.status === filter;
            let matchesTag = !activeTag || home.tags.includes(activeTag)
            if (matchesFilter && matchesTag) {
              return (
                <div style={{
                  margin:"20px",
                  padding: "20px",
                  paddingRight: "100px",
                  backgroundColor:"lightgrey"}}>
                  <h3>{home.name}</h3>
                  <h4>${home.cost}</h4>
                  <div>
                    <span>{home.bed} bed, {home.bath} bath</span>
                  </div>
                  <div>
                    <p>{home.tags.join(", ")}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </Drawer>
  )
}