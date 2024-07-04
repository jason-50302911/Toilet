import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl, location, mode) => {
    const [toiletData, setToiletData] = useState([]);
    const [nearToilet, setNearToilet] = useState(null);
    const [distance, setDistance] = useState(null);
    const [nearLoc, setNearLoc] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url, location, mode) => {
            setIsLoading(true);
            try {
                let response = null;
                if (mode === 'finding'){
                    response = await axios.get(url, {
                        cancelToken: source.token,
                        params: {
                            target: "finding",
                            lat: location.lat,
                            lng: location.lng
                        }
                    })
                } else {
                    response = await axios.get(url, {
                        cancelToken: source.token,
                        params: {
                            target: "toilets",
                            lat: location.lat,
                            lng: location.lng
                        }
                    })
                }
                if (isMounted) {
                    if(mode === "finding"){
                        const res = response.data;
                        setToiletData(res.toiletData);
                        setNearToilet(res.nearest_uuid);
                        setDistance(res.distance);
                        setNearLoc(res.near_loc);
                        setFetchError(null);
                    } else setToiletData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setToiletData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl, location, mode);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl, location, mode]);

    return { toiletData, nearToilet, nearLoc, distance, fetchError, isLoading };
}

export default useAxiosFetch;