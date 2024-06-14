import { APIProvider, Map} from '@vis.gl/react-google-maps';
import { useEffect, useState, useMemo } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Markers from './Markers';


const Maps = ({ isLoaded })  => {

    const [center, setCenter] = useState(null);
    const [nowCenter, setNowCenter] = useState(null);

    const [renderToilet, setRenderToilet] = useState(null);

    const defaultZoomLevel = 17;
    
    const nowLocation = useStoreState((state) => state.nowLocation);
    const toilets = useStoreState((state) => state.toilets);

    const setDisplay = useStoreActions((actions) => actions.setDisplay);
    const findAroundToliets = useStoreActions((actions) => actions.findAroundToilets);

    // const options = useMemo(
    //     () => ({
    //       mapId: process.env.REACT_APP_MAPID,
    //       disableDefaultUI: true,
    //       clickableIcons: false
    //     }), []);

    useEffect(() => {
      setRenderToilet(toilets);
    }, [toilets, setRenderToilet])
        
    useEffect(() => {
      setCenter(nowLocation);
      setNowCenter(nowLocation);
    }, [nowLocation, setCenter, setNowCenter]);

    const handleZoomChange = (event) => {
      const zoomSize = event.detail.zoom;
      if (zoomSize < 15) setDisplay(false);
      else setDisplay(true);
    }

    const handleCameraChange = (event) => {
      const presentCenter = event.detail.center;
      if ((Math.abs(presentCenter.lat - nowCenter.lat) > 0.001) || (Math.abs(presentCenter.lng - nowCenter.lng) > 0.001)){
        setNowCenter(presentCenter);
        findAroundToliets(presentCenter);
      }
    }


    return (
        <>
        {isLoaded && center != null ? (
          <div className="mapScreenContainer">
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultZoom={defaultZoomLevel}
                    defaultCenter={center}
                    mapId={"49ae42fed52588c3"}
                    disableDefaultUI={"true"}
                    mapTypeId={"roadmap"}
                    onZoomChanged={event => handleZoomChange(event)}
                    onCameraChanged={event => handleCameraChange(event)}>
                    <Markers points={renderToilet}/>
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


