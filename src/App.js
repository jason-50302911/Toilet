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
import SelectedType from './SelectedType';
import SelectedUse from './SelectedUse';
import SelectedStore from './SelectedStore';
import Finding from './Finding';


function App() {
  const nowCenter = useStoreState((state) => state.nowCenter);
  const mode = useStoreState((state) => state.mode);
  const bounds = useStoreState((state) => state.bounds);
  
  const setToilets = useStoreActions((actions) => actions.setToilets);
  const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
  const setInitLocation = useStoreActions((actions) => actions.setInitLocation);

  const URL = process.env.REACT_APP_BACKEND_URL;
  // const URL = "http://192.168.100.169:5000"

  const { toiletData, nearToilet, nearLoc, distance } = useAxiosFetch(URL, nowCenter, bounds, mode);
  
  const location = useGeoLocation();

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
      <Map distance={distance}/>
      <Routes>
        <Route path="/" element={<InfoWindow/>}/>
        <Route path="/:findMode" element={<Finding nearToilet={nearToilet} nearLoc={nearLoc}/>}/>
        <Route path="/select/type/:type" element={<SelectedType/>}/>
        <Route path="/select/use/:useType" element={<SelectedUse/>}/>
        <Route path="/select/store/:storeType" element={<SelectedStore/>}/>
        <Route path="/place/:id" element={<InfoWindow/>}/>
        <Route path="/discuss/:id" element={<Discuss/>}/>
        <Route path="/toiletPage/:id" element={<ToiletPage/>}/>
      </Routes> 
    </div>
);
}

export default App;
