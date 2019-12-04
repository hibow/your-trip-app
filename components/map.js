import React from 'react';
import GoogleMapReact from 'google-map-react';
import env from '../config';
import Marker from './marker'


const SimpleMap = ({footprints, onMapClick}) => {

  let places = [...footprints];
  places.forEach((place) => {
    place.show = false;
  })

  const [index, setIndex] = React.useState('');

  let center = {}
  if (!footprints.length) {
    center.lat = 51.5057975;
    center.lng = -0.0751559
  } else {
    center.lat = footprints[0].position.lat;
    center.lng = footprints[0].position.lng;
  }

  const defaultProps = {
    center: {
      lat: 51.5057975,
      lng: -0.0751559,
    },
    zoom: 2
  };

  const _onChildMouseEnter = (key) => {
    setIndex(key);
  }
  const _onChildMouseLeave = () => {
    setIndex('');
  }

  const _onChildClick = (key) => {
    onMapClick(key);
  }
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: env.GOOGLE_API_KEY,
            libraries: ['places', 'geometry'],}}
          defaultCenter={defaultProps.center}
          center={center}
          defaultZoom={defaultProps.zoom}
          onChildMouseEnter={_onChildMouseEnter}
          onChildMouseLeave={_onChildMouseLeave}
          onChildClick = {_onChildClick}
          onClick = {_onChildClick}
          >
            {places.map((marker, i) =>{
              let show = marker.show;
              if (marker.id === index) {
                show = !marker.show;
              }
              return(
                <Marker
                key={marker.id}
                text={marker.title}
                lat={marker.position.lat}
                lng={marker.position.lng}
                alt={marker.title}
                show={show}
                place={marker}
                />

              )
            })}
          </GoogleMapReact>
      </div>
    );
}


export default SimpleMap;
