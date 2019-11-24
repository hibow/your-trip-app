import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import env from '../config';


const SimpleMap = (props) => {
  const {footprints} = props;
  const locations = footprints;
  const defaultProps = {
    center: {
      lat: locations[0].position.lat,
      lng: locations[0].position.lng
    },
    zoom: 4
  };
  const renderMarkers= (map, maps, locations) => {
    var markers = locations.map(function(location, i) {
      return new maps.Marker({
        position: location.position,
        // draggable: true,
        animation: maps.Animation.DROP,
        map,
        title: location.title
      });
    });

  }
    return (
      //need to set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: env.GOOGLE_API_KEY}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => {
            renderMarkers(map, maps, locations);
          }}
        />
      </div>
    );
}


export default connect(state => state, null)(SimpleMap);
