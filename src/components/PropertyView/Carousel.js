import React from 'react'

import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';

import img1 from '../../img1.png'
import img2 from '../../img2.png'
import img3 from '../../img3.png'


const { red, blue, green } = require('@material-ui/core/colors');

export default function Carousel(props) {
  return (
    <AutoRotatingCarousel
        open={props.open}
        onClose={props.close}
        autoplay={false}
        style={{
          position: 'absolute',
          backgroundColor: 'black'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#7837FF',
          height: "100%"
        }}>
          <img src={img1} style={{ height: '85%'}}/>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#7837FF',
          height: "100%"
        }}>
          <img src={img2} style={{ height: '85%'}}/>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#7837FF',
          height: "100%"
        }}>
          <img src={img3} style={{ height: '85%'}}/>
        </div>
        
        {/* <Slide
          media={<img src={img3} />}
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title='May the force be with you'
          subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
        /> */}
      </AutoRotatingCarousel>
  )
}