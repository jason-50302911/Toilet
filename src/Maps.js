import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Markers from './Markers';
import _ from 'lodash';

const Maps = ()  => {
    const [center, setCenter] = useState(null);

    const defaultZoomLevel = 17;
    
    const nowCenter = useStoreState((state) => state.nowCenter);
    const mode = useStoreState((state) => state.mode);

    const setDisplay = useStoreActions((actions) => actions.setDisplay);
    const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
    const setMode = useStoreActions((actions) => actions.setMode);

    const debounce = _.debounce((_changeCenter) => {
        setNowCenter(_changeCenter); 
      }, 500);

    useEffect(() => {
      if (mode === "detect") {
        setCenter(nowCenter);
      }
    }, [nowCenter, mode]);

    const handleCameraChange = (event) => {
      const presentCenter = event.detail.center;
      const zoomSize = event.detail.zoom;
      if (zoomSize > 13) {
        debounce(presentCenter);
        setMode('Moving');
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


