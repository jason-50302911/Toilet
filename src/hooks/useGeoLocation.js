import { useEffect, useState } from 'react';

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        load: false,
        coordinates: null
    })

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: parseFloat(location.coords.latitude), 
                lng: parseFloat(location.coords.longitude)
            }
        });
    };
    const onError = () => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: parseFloat(25.05286057263348), 
                lng: parseFloat(121.52015620282863)
            }
        });;
    }

    useEffect(() => {
        if (!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        } 

        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true
        });
    }, [])



    return location;
}

export default useGeoLocation