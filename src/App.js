import { useEffect } from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import useAxiosFetch from './hooks/useAxiosFetch';
import useGeoLocation from './hooks/useGeoLocation';
import useLiff from './hooks/useLiff';
import InfoWindow from './InfoWindow';
import Discuss from './Discuss';
import Map from "./Maps";
import ToiletPage from './ToiletPage';
import SelectForm from "./SelectTypeForm";
import Selected from './Selected';


function App() {
  const nowCenter = useStoreState((state) => state.nowCenter);
  const mode = useStoreState((state) => state.mode);
  
  const setToilets = useStoreActions((actions) => actions.setToilets);
  const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
  const setNowLocation = useStoreActions((actions) => actions.setNowLocation);
  const setClickNumber = useStoreActions((actions) => actions.setClickNumber);
  const setCenPoint = useStoreActions((actions) => actions.setCenPoint);
  const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

  const URL = "https://toiletproject-e05ca1dabfc6.herokuapp.com";
  // const URL = "http://192.168.100.169:5000"

  const { toiletData, nearToilet, nearLoc } = useAxiosFetch(URL, nowCenter, mode);
  
  const location = useGeoLocation();

  const { liffObject } = useLiff();

  useEffect(() => {
    if (mode === 'detect'){
      setNowCenter(location.coordinates);
      setNowLocation(location.coordinates);
    }
  }, [location, setNowCenter, mode, setNowLocation]);

  useEffect(() => {
    if (mode === "detect") {
      if (nearToilet) setClickNumber(nearToilet);
      if (nearLoc) setCenPoint(nearLoc);
      setInfoWinState('idle');
    }
  }, [nearToilet, mode, setClickNumber, nearLoc, setCenPoint, setInfoWinState]);

  useEffect(() => {
    setToilets(toiletData);
  }, [toiletData, setToilets]);

  return (
    <div className="App">
      <Header webTitle="Eazy Toilet"/>
      <SelectForm/>
      <Map/>
      <Routes>
        <Route path="/" element={
            <InfoWindow 
              liffObject={liffObject} 
              location={location}
            />}/>
        <Route path="/place/msg/:condition" element={<Selected/>}/>
        <Route path="/place/:id" element={
            <InfoWindow 
              liffObject={liffObject} 
              location={location}
            />}/>
        <Route path="/place/discuss/:id" element={<Discuss/>}/>
        <Route path="/place/toiletPage/:id" element={<ToiletPage/>}/>
      </Routes> 
    </div>
);
}

export default App;
