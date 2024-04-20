import React, { useState } from 'react'; 
import './App.css';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';



const containerStyle = {
  width: '40vw', 
  height: '40vh',
  margin: '100px'
};

const center = {
  lat: 42.74, 
  lng: -84.55  
};


function App() {

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, async (results) => {
      for (const component of results[0].address_components) {
        if (component.types.includes("country")) {
          const countryName = component.long_name;
          break;
        }
      }
    });
  };

  

  return (
    <div>
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleMapClick}
      >
      </GoogleMap>
    </div>
    
  );
}

export default App;
