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
import Home from './Home';
import ToiletPage from './ToiletPage';
import SelectForm from "./SelectTypeForm";



function App() {
  const nowCenter = useStoreState((state) => state.nowCenter);
  const mode = useStoreState((state) => state.mode);
  
  const setToilets = useStoreActions((actions) => actions.setToilets);
  const setNowCenter = useStoreActions((actions) => actions.setNowCenter);

  // const URL = "https://toiletproject-e05ca1dabfc6.herokuapp.com";
  const URL = "http://192.168.100.169:5000"

  const { data, isLoading, fetchError } = useAxiosFetch(URL, nowCenter);
  const location = useGeoLocation();
  const { liffObject, liffError } = useLiff();

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
        <Route path="/place/:id" element={<InfoWindow liffObject={liffObject}/>}/>
        <Route path="/place/discuss/:id" element={<Discuss/>}/>
        <Route path="/place/toiletPage/:id" element={<ToiletPage/>}/>
      </Routes> 
    </div>
);
}

export default App;
