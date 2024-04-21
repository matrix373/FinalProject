import React, { useEffect, useState } from 'react'; 
import './App.css';
import { GoogleMap, LoadScript} from '@react-google-maps/api';


const containerStyle = {
  width: '100%', 
  height: '100%',
};

const center = {
  lat: 42.74, 
  lng: -84.55  
};


function App() {
  const [currencyConverter, setCurrencyConverter] = useState('1 USD = 1.00000 USD');
  const [countryGetter, setCountryGetter] = useState('United States');

  const getCurrencyCode = async (countryISOCode) => {  
    const bdc_key = process.env.REACT_APP_BDC_API_KEY;
    const data = await fetch(`https://api-bdc.net/data/country-info?code=${countryISOCode}&localityLanguage=en&key=${bdc_key}`);
    if(data.ok) {
      const dataSet = await data.json();
      return dataSet.currency.code;
    }
  };

  const convertCurrency = async (currencyCode) => {
    const freaks_key = process.env.REACT_APP_CURRENCY_FREAKS_API_KEY;
    const data = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${freaks_key}&symbols=${currencyCode},USD`);
    if(data.ok) {
      const dataSet = await data.json();
      const rate = dataSet.rates[currencyCode];
      const displayRate = parseFloat(rate).toFixed(5);
      return `1 USD = ${displayRate} ${currencyCode}`;
    }
    else {
      return `1 USD = 1.00000 USD`;
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
          setCountryGetter(countryName);
          break;
        }
      }
    });
  };

  return (
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      language='en'
      version='weekly'
    >
      <div className="container-fluid text-center p-0">
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-white currency-header w-100 p-3">CURRENCY EXCHANGE RATES</h1>
            <img src="/Frame1.png" alt="Choose a country" className="img-fluid" />
          </div>
        </div>
        <div className="row align-items-end static-background p-5">
          <div className="col-md-5 mb-3" >
            <div className="info-card text-white response-backgournd p-3 shadow rounded d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '350px' }}>
              <h2 className="my-2 fs-1 fw-bold">{countryGetter}</h2>
              <p className="lead my-2 fs-2">{currencyConverter}</p>
            </div>
          </div>
          <div className="col-md-7" style={{ height: `50vh` }}>        
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onClick={handleMapClick}
            />
          </div>
        </div>
      </div>
    </LoadScript>
    
    
  );
}

export default App;
