import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
import { useLoadScript } from '@react-google-maps/api';
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
  const setToilets = useStoreActions((actions) => actions.setToilets);
  const setNowLocation = useStoreActions((actions) => actions.setNowLocation);

  const toilets = useStoreActions((actions) => actions.toilets);
  
  const location = useGeoLocation();
  const URL = "https://toiletproject-e05ca1dabfc6.herokuapp.com";
  // const URL = "http://127.0.0.1:5000";
  const { data, isLoading, fetchError } = useAxiosFetch(URL, location.coordinates);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    setNowLocation(location.coordinates)
  }, [location, setNowLocation]);

  useEffect(() => {
    setToilets(data);
  }, [data, setToilets]);

  return (
    <div className="App">
      <Header webTitle="Eazy Toilet"/>
      <SelectForm/>
      <Map isLoaded={isLoaded}/>
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
