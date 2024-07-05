import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState, useCallback } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Markers from './Markers';
import _ from 'lodash';
import useWindowSize from "./hooks/useWindowSize";
import BackToInit from "./BackToInit";

const Maps = ({ distance })  => {
    const [defZoom, setDefZoom] = useState(null); 
    
    const cenPoint = useStoreState((state) => state.cenPoint);
    const mode = useStoreState((state) => state.mode);
    const nowCenter = useStoreState((state) => state.nowCenter);
    const infoWinState = useStoreState((state) => state.infoWinState);
    const mapCenter = useStoreState((state) => state.mapCenter);

    const { width } = useWindowSize();

    const setDisplay = useStoreActions((actions) => actions.setDisplay);
    const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
    const setMode = useStoreActions((actions) => actions.setMode);
    const setMapCenter = useStoreActions((actions) => actions.setMapCenter);

    const initMap = useCallback(([nlat, nlng]) => {
      if (infoWinState){
        if ( width <= 800) setMapCenter({ lat: parseFloat(nlat - 0.001), lng: parseFloat(nlng) })
        else setMapCenter({ lat: parseFloat(nlat), lng: parseFloat(nlng - 0.002) })
      } else setMapCenter({ lat: parseFloat(nlat), lng: parseFloat(nlng) })
    }, [setMapCenter, infoWinState, width]);

    const debounce = _.debounce((_changeCenter) => {
        setNowCenter(_changeCenter); 
      }, 250);


    useEffect(() => {
      if (distance) {
        if (distance > 1.3) setDefZoom(14);
      } else setDefZoom(16);
    }, [distance, setDefZoom]);

    useEffect(() => {
      let nlat = null;
      let nlng = null;
      if (mode === "detect" && nowCenter) {
        nlat = nowCenter.lat;
        nlng = nowCenter.lng;
      }
      if (mode === "finding" && cenPoint) {
        nlat = cenPoint.lat;
        nlng = cenPoint.lng;
      }

      if (nlat || nlng) initMap([nlat, nlng]);

    }, [cenPoint, mode, nowCenter, initMap]);

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
        {mapCenter != null ? (
          <div className="mapScreenContainer">
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultZoom={defZoom}
                    defaultCenter={mapCenter}
                    mapId={"49ae42fed52588c3"}
                    disableDefaultUI={"true"}
                    mapTypeId={"roadmap"}
                    onCameraChanged={event => handleCameraChange(event)}>
                    <Markers/>
                    <BackToInit/>
                </Map>
              </APIProvider>
          </div>
        ) : (
          <div className="loading">Map is Loading</div>
        )}
      </>
    );
    
}

export default Maps


