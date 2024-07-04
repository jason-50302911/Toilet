import { useMap } from '@vis.gl/react-google-maps';
import { IoNavigateSharp } from "react-icons/io5";
import { useStoreState } from "easy-peasy";


const BackToIint = () => {
  const map = useMap();

  const initLocation = useStoreState((state) => state.initLocation);
  const infoWinState = useStoreState((state) => state.infoWinState);

  const handleClick = () => {
    if (map) map.panTo({ lat: parseFloat(initLocation.lat), lng: parseFloat(initLocation.lng) });
  }

  return (
    <button 
      className={infoWinState ? "openBackInit" : "backInit"}
      onClick={handleClick}>
        <IoNavigateSharp/>
    </button>
  )
}

export default BackToIint