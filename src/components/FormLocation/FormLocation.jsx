import React, { useEffect, useState } from 'react';
import "./FormLocation.css"

const FormLocation = ({ setLocalData, localData, setError }) => {
  const [latitude, setLatitude] = useState(localData.latitude);
  const [longitude, setLongitude] = useState(localData.longitude);


  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLatitude = position.coords.latitude;
          const currentLongitude = position.coords.longitude;

          // setLatitude(currentLatitude.toFixed(6));
          // setLongitude(currentLongitude.toFixed(6));
          const localObj = {
            latitude: currentLatitude.toFixed(6),
            longitude: currentLongitude.toFixed(6)
          }
          setLocalData(localObj)
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Error getting location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };

  const validation = (e) => {
    setError("")
    if (e.target.name === "latitude") {
      if (!(e.target.value >= -90 && e.target.value <= 90)) {
        console.log("Anshu")
        setError("Incorrect Latitude Value")
        return
      }
    }
    if (e.target.name === "longitude") {
      if (!(e.target.value >= -180 && e.target.value <= 180)) {
        setError("Incorrect Longitude Value")
        return
      }
    }

    setLocalData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  useEffect(() => {
    setError("")
  }, [latitude, longitude])

  useEffect(() => {
    setLatitude(localData.latitude)
    setLongitude(localData.longitude)
  },[localData])

  return (
    <form className='form_container'>
      <div className='inner_container'>
        <div className='container_field'>
          <label htmlFor="latitude" style={{ fontWeight: "bold", fontSize: "19px" }}>Latitude:</label>
          <input type="text" id="latitude" name="latitude" value={latitude}
            onBlur={(e) => validation(e)}
            onChange={(e) => setLatitude(e.target.value)}
            autoComplete='off'
          />
        </div>
        <div className='container_field'>
          <label htmlFor="longitude" style={{ fontWeight: "bold", fontSize: "19px" }}>Longitude:</label>
          <input type="text" id="longitude" name="longitude" value={longitude}
            onBlur={(e) => validation(e)}
            onChange={(e) => setLongitude(e.target.value)}
            autoComplete='off'
          />
        </div>
      </div>
      <button className='form_btn' type="button" onClick={getCurrentLocation}>Get Current Location</button>
    </form>
  );
};

export default FormLocation;