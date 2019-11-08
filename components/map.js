//map box : need resize -> later work
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import env from '../config';
import Marker from './marker';
import data from '../db/data';

// const Marker = ({ text }) => <div>{text}</div>;
const locations = data;
// [
//   {
//     lat: 53.807877,
//     lng: -1.554886,
//     text: '123'
//   },
//   {
//     lat: 51.502735,
//     lng: -0.150877,
//     text: '234'
//   },
//   {
//     lat: 52.507645,
//     lng: 13.390341,
//     text: 'Check point Charlie'
//   }
// ]

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 51.502735,
      lng: -0.150877
    },
    zoom: 4
  };
  renderMarkers(map, maps, locations) {
    // console.log(locations)
    var markers = locations.map(function(location, i) {
      console.log(location.summary)
      return new maps.Marker({
        position: location.position,
        draggable: true,
        animation: maps.Animation.DROP,
        map,
        title: location.title
        // label: labels[i % labels.length]
      });
    });
    // let marker = new maps.Marker({
    //   position:
    //     {
    //       lat: 51.502735,
    //       lng: -0.150877
    //     },
    //   draggable: true,
    //   animation: maps.Animation.DROP,
    //   map,
    //   title: 'Hello World!'
    // });
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: env.GOOGLE_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({map, maps}) => {
            this.renderMarkers(map, maps, locations);
          }} */}
        {/* > */}

          <Marker
            lat={51.502735}
            lng={-0.150877}
            // text="My Marker"
          />
        {/* </GoogleMapReact> */}
      </div>
    );
  }
}

export default SimpleMap;

