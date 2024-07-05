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
import Finding from './Finding';


function App() {
  const nowCenter = useStoreState((state) => state.nowCenter);
  const mode = useStoreState((state) => state.mode);
  
  const setToilets = useStoreActions((actions) => actions.setToilets);
  const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
  const setInitLocation = useStoreActions((actions) => actions.setInitLocation);

  const URL = process.env.REACT_APP_BACKEND_URL;
  // const URL = "http://192.168.100.169:5000"

  const { toiletData, nearToilet, nearLoc } = useAxiosFetch(URL, nowCenter, mode);
  
  const location = useGeoLocation();

  const { liffObject } = useLiff();

  useEffect(() => {
    if (mode === 'detect' || mode === 'finding'){
      setNowCenter(location.coordinates);
      setInitLocation(location.coordinates);
    }
  }, [location, setNowCenter, mode, setInitLocation]);

  useEffect(() => {
    setToilets(toiletData);
  }, [toiletData, setToilets]);

  return (
    <div className="App">
      <Header webTitle="Eazy Toilet"/>
      <SelectForm/>
      <Map/>
      <Routes>
        <Route path="/" element={<InfoWindow liffObject={liffObject}/>}/>
        <Route path="/finding/:findMode" element={<Finding nearToilet={nearToilet} nearLoc={nearLoc} liffObject={liffObject}/>}/>
        <Route path="/msg/:condition" element={<Selected/>}/>
        <Route path="/place/:id" element={<InfoWindow liffObject={liffObject}/>}/>
        <Route path="/discuss/:id" element={<Discuss/>}/>
        <Route path="/toiletPage/:id" element={<ToiletPage/>}/>
      </Routes> 
    </div>
);
}

export default App;
