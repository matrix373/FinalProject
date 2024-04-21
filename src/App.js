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
  const [currencyConverter, setCurrencyConverter] = useState('');

  const getCurrencyCode = async (countryISOCode) => {  

    const data = await fetch(`https://api-bdc.net/data/country-info?code=${countryISOCode}&localityLanguage=en&key=bdc_7fe4975bd35841baa0e5561160caa837`);
    if(data.ok) {
      const dataSet = await data.json();
      return dataSet.currency.code;
    }
  };

  const convertCurrency = async (currencyCode) => {
    const data = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=6583d5d1ef914621a7720f63f5b3b4e9&symbols=${currencyCode},USD`);
    if(data.ok) {
      const dataSet = await data.json();
      const rate = dataSet.rates[currencyCode];
      const displayRate = parseFloat(rate).toFixed(5);
      return `1 USD = ${displayRate} ${currencyCode}`;
    }
  }

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, async (results) => {
      for (const component of results[0].address_components) {
        if (component.types.includes("country")) {
          const countryName = component.long_name;
          const countryISOCode = component.short_name;

          const currencyCode = await getCurrencyCode(countryISOCode);
          const exchangeRate = await convertCurrency(currencyCode);
          setCurrencyConverter(exchangeRate);

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
      <div>
        <p>{currencyConverter}</p>
      </div>
    </div>
    
  );
}

export default App;
