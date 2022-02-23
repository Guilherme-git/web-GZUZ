/* eslint-disable no-unused-vars */

import React, { memo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import IconCard from '../../../../assets/images/car.png';
import './Maps.scss';

const initialPosition = { lat: -16.622225, lng: -51.095984 };


const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCWsV130SDbB444ui-CS_xoFWe8pxqRP-Q"
  })

  const [deliveries, setDeliveries] = useState([
    {
      lat: -16.621753,
      lng: -51.092633,
    },
    {
      lat: -16.612541,
      lng: -51.098972,
    },
  ]);

  const [position, setPosition] = useState({
    latitude: -16.6799,
    longitude: -49.2422,
  });

  return (
    <div className="container-maps">
      {
        isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '95%', borderRadius: '20px'}}
            center={initialPosition}
            zoom={13}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
          >
            {deliveries.map((item) =>
              <Marker
                onClick={() => alert('teste')}
                icon={IconCard}
                position={{
                  lat: item.lat,
                  lng: item.lng
                }} />
            )}
          </GoogleMap>
        ) : null
      }
    </div>
  );
};

export default memo(Maps);
