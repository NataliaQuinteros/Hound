import React, { useState, useEffect } from 'react';

const GeolocationComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let watchId;

    // Check if the Geolocation API is available
    if ('geolocation' in navigator) {
      // Set options for geolocation
      const options = {
        enableHighAccuracy: true, // Enable high accuracy
        timeout: 1000000, // Maximum time (in milliseconds) to wait for location data
        maximumAge: 0, // Maximum age (in milliseconds) of the location data. 0 means no cache.
      };

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        },
        options
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }

    // Cleanup function to clear the watch on component unmount
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Your current location is: {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GeolocationComponent;