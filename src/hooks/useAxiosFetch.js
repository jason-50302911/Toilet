import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl, location) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url, location) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                    params: {
                        target: "toilets",
                        lat: location.lat,
                        lng: location.lng
                    }
                })
                if (isMounted) {
                    const count = Object.keys(response.data).length
                    console.log(count);
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl, location);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl, location]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;