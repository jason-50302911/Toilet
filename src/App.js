import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreState, useStoreActions } from "easy-peasy";
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import useGeoLocation from './hooks/useGeoLocation';
import InfoWindow from './InfoWindow';
import Discuss from './Discuss';
import Map from "./Maps";
import Home from './Home';
import ToiletPage from './ToiletPage';
import SelectForm from "./SelectTypeForm";


function App() {
  const nowCenter = useStoreState((state) => state.nowCenter);
  const mode = useStoreState((state) => state.mode);
  
  const setToilets = useStoreActions((actions) => actions.setToilets);
  const setNowCenter = useStoreActions((actions) => actions.setNowCenter);
  
  const location = useGeoLocation();

  const URL = "https://toiletproject-e05ca1dabfc6.herokuapp.com";

  const { data, isLoading, fetchError } = useAxiosFetch(URL, nowCenter);

  useEffect(() => {
    if (mode === 'detect'){
      setNowCenter(location.coordinates);
    }
  }, [location, setNowCenter, mode]);

  useEffect(() => {
    setToilets(data);
  }, [data, setToilets]);

  return (
    <div className="App">
      <Header webTitle="Eazy Toilet"/>
      <SelectForm/>
      <Map/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/place/:id" element={<InfoWindow/>}/>
        <Route path="/place/discuss/:id" element={<Discuss/>}/>
        <Route path="/place/toiletPage/:id" element={<ToiletPage/>}/>
      </Routes> 
    </div>
);
}

export default App;
