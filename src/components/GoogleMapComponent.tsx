'use client';

import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsProvider';

interface GoogleMapComponentProps {
  onSelectLocation: (lat: number, lng: number) => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ onSelectLocation }) => {
  const { isLoaded } = useGoogleMaps();

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 28.704060,
    lng: 77.102493
  };

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onSelectLocation(e.latLng.lat(), e.latLng.lng());
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleClick}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>;
};

export default GoogleMapComponent;
