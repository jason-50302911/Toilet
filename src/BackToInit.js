import { useMap } from '@vis.gl/react-google-maps';
import { IoNavigateSharp } from "react-icons/io5";
import { useCallback } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import useWindowSize from "./hooks/useWindowSize";

const BackToIint = () => {
  const map = useMap();

  const { width } = useWindowSize();

  const initLocation = useStoreState((state) => state.initLocation);
  const infoWinState = useStoreState((state) => state.infoWinState);
  const mapCenter = useStoreState((state) => state.mapCenter); 

  const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

  const cenPanTo = useCallback((pos) => {
    if (map) {
      if (width > 800) map.setZoom(19);
      else map.setZoom(18);
      setTimeout(() => {
        map.panTo(pos);
      }, 400);
    }
  }, [width, map]);

  const handleClick = () => {
    const pos = { lat: parseFloat(initLocation.lat), lng: parseFloat(initLocation.lng) };
    if(infoWinState) setInfoWinState(null);
    cenPanTo(pos);
  }

  return (
    <>
      {mapCenter &&
        <button 
          className={infoWinState && width < 800 ? "openBackInit" : "backInit"}
          onClick={handleClick}>
            <IoNavigateSharp/>
        </button>}
    </>
  )
}

export default BackToIint