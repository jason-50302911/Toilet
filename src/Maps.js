import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Markers from './Markers';
import _ from 'lodash';
import useWindowSize from "./hooks/useWindowSize";

const Maps = ()  => {
    const [center, setCenter] = useState(null);

    const defaultZoomLevel = 16;
    
    const cenPoint = useStoreState((state) => state.cenPoint);
    const mode = useStoreState((state) => state.mode);

    const { width } = useWindowSize();

    const setDisplay = useStoreActions((actions) => actions.setDisplay);
    const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
    const setMode = useStoreActions((actions) => actions.setMode);

    const debounce = _.debounce((_changeCenter) => {
        setNowCenter(_changeCenter); 
      }, 500);

    useEffect(() => {
      if (mode === "detect" && cenPoint) {
        if ( width <= 800) setCenter({ lat: parseFloat(cenPoint.lat - 0.003), lng: parseFloat(cenPoint.lng) })
        else setCenter({ lat: parseFloat(cenPoint.lat), lng: parseFloat(cenPoint.lng - 0.0045) })
      }
    }, [cenPoint, mode, width]);

    const handleCameraChange = (event) => {
      const presentCenter = event.detail.center;
      const zoomSize = event.detail.zoom;
      if (zoomSize > 13) {
        debounce(presentCenter);
        setMode('moving');
      }
      if (zoomSize < 13) setDisplay(false);
      else setDisplay(true);
    }


    return (
      <>
        {center != null ? (
          <div className="mapScreenContainer">
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultZoom={defaultZoomLevel}
                    defaultCenter={center}
                    mapId={"49ae42fed52588c3"}
                    disableDefaultUI={"true"}
                    mapTypeId={"roadmap"}
                    onCameraChanged={event => handleCameraChange(event)}>
                    <Markers/>
                </Map>
              </APIProvider>
          </div>
        ) : (
          <div>Map is Loading</div>
        )}
      </>
    );
    
}

export default Maps


