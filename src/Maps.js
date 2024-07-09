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

    const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
    const setMode = useStoreActions((actions) => actions.setMode);
    const setMapCenter = useStoreActions((actions) => actions.setMapCenter);
    const setBounds = useStoreActions((actions) => actions.setBounds);

    const TAIWAN_LATLNG = {
      north: 26,
      south: 21,
      west: 117,
      east: 124
    };

    const TAIWAN_RESTRICT = {
      latLngBounds: TAIWAN_LATLNG,
      strictBounds: false
    }

    const initMap = useCallback(([nlat, nlng]) => {
      let pos = null;
      if (infoWinState){
        if ( width <= 800 && distance < 0.5) 
          pos = { lat: parseFloat(nlat - 0.0018), lng: parseFloat(nlng) };
        else if ( width <= 800 && (distance > 0.5 && distance < 1)) 
          pos = { lat: parseFloat(nlat - 0.0038), lng: parseFloat(nlng) };
        else if ( width <= 800 &&  distance > 1) 
          pos = { lat: parseFloat(nlat - 0.02), lng: parseFloat(nlng) };
        else pos = { lat: parseFloat(nlat), lng: parseFloat(nlng - 0.003) };
      } else pos = { lat: parseFloat(nlat), lng: parseFloat(nlng) };
      setMapCenter(pos);
    }, [setMapCenter, infoWinState, width, distance]);

    const debounce = _.debounce((_changeCenter, _changeBounds) => {
        setNowCenter(_changeCenter); 
        setBounds(_changeBounds);
      }, 300);


    useEffect(() => {
      if (distance) {
        console.log(distance);
        if (distance > 1) setDefZoom(12.7);
        else if (distance > 0.5 && distance < 1) setDefZoom(14);
      } else setDefZoom(16.8);
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
      const mapBounds = event.detail.bounds
      const settingBounds = {
        latNorth: mapBounds.north,
        latSouth: mapBounds.south,
        lngEast: mapBounds.east,
        lngWest: mapBounds.west
      };
      debounce(presentCenter, settingBounds);
      setMode('moving');
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
                    disableDefaultUI={true}
                    mapTypeId={"roadmap"}
                    restriction={TAIWAN_RESTRICT}
                    clickableIcons={false}
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


