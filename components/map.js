import React from 'react';
import GoogleMapReact from 'google-map-react';
import env from '../config';
import Marker from './marker'

const SimpleMap = ({footprints}) => {
  let center = {}
  if (!footprints.length) {
    center.lat = 51.5057975;
    center.lng = -0.0751559
  } else {
    center.lat = footprints[0].position.lat;
    center.lng = footprints[0].position.lng;
  }
  const defaultProps = {
    center,
    zoom: 4
  };
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: env.GOOGLE_API_KEY}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          >
            {footprints.map((marker, i) =>{
              return(
                <Marker
                key={i}
                  lat={marker.position.lat}
                  lng={marker.position.lng}
                  alt={marker.title}
                />

              )
            })}
          </GoogleMapReact>
      </div>
    );
}


export default SimpleMap;
