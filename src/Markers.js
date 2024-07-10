import {
    useMap,
    AdvancedMarker,
    Pin
  } from "@vis.gl/react-google-maps";
import { useCallback, useEffect } from "react";
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from "easy-peasy";
import MarkerIcon from "./MarkerIcon";
import useWindowSize from './hooks/useWindowSize';

const Markers = () => {
    const map = useMap();

    const toilets = useStoreState((state) => state.toilets);
    const clickNumber = useStoreState((state) => state.clickNumber);
    const renderToilets = useStoreState((state) => state.renderToilets);
    const initLocation = useStoreState((state) => state.initLocation);
    const mapCenter = useStoreState((state) => state.mapCenter);
    
    const usingType = useStoreState((state) => state.usingType);
    const storeType = useStoreState((state) => state.storeType);
    const type = useStoreState((state) => state.type);

    const { width } = useWindowSize();

    const setRenderToilets = useStoreActions((actions) => actions.setRenderToilets);
    const setClickNumber = useStoreActions((actions) => actions.setClickNumber);
    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

    const filtering = useCallback((toiletList) => {
      let sortCategr = null;
      let sortTarget = null;
      if (usingType) {
        sortCategr = usingType;
        sortTarget = "patterns";
      }
      if (storeType) {
        sortCategr = storeType;
        sortTarget = "type3";
      }
      if (sortCategr && toiletList.length !== 0) 
        return toiletList.filter((toilet) => toilet[sortTarget] === sortCategr);  
      else return toiletList;
    }, [usingType, storeType]);

    useEffect(() => {
      let cpToilet = JSON.parse(JSON.stringify(toilets));
      if (type.length !== 0) {
        cpToilet.forEach((toilet) => {
          const aggregate = toilet.aggregate;
          const filtered = aggregate.filter((idType) =>  !(type.includes(String(idType.type))));
          if (filtered.length === 0) {
            const filterToilets = cpToilet.filter((refToilet) =>  refToilet.uuid !== toilet.uuid);
            cpToilet = [...filterToilets];
          } else toilet.aggregate = [...filtered];
        });
      };
      const filCpToilet = filtering(cpToilet);
      setRenderToilets(filCpToilet);
    }, [toilets, setRenderToilets, type, filtering]);

    const handleOnClick = (point) => {
      const plat = point.lat;
      const plng = point.lng;
      if (map) {
        if (width > 800) {
          map.panTo({ lat: parseFloat(plat), lng: parseFloat(plng) - 0.00035 });
          map.setZoom(20);
        }
        else {
          const modifyPosition = { lat: parseFloat(plat - 0.00045), lng: parseFloat(plng) };
          map.panTo(modifyPosition);
          map.setZoom(19.5);
        }
        setClickNumber(point.uuid);
        setInfoWinState('idle');
      }
    };
  
    return (
        <>
          {toilets && mapCenter &&
            <div>
              <AdvancedMarker position={{ lat: parseFloat(initLocation.lat), lng: parseFloat(initLocation.lng) }}>
                <span className="nowLocation">
                <Pin
                  background={"grey"}
                  borderColor={"green"}
                  glyphColor={"purple"}
                />  
                </span>
              </AdvancedMarker>
              {renderToilets.map((point) => (
                <AdvancedMarker
                  position={{lat: parseFloat(point.lat), lng: parseFloat(point.lng)}}
                  className={"markerContainer"}
                  key={point.uuid}
                  onClick={() => handleOnClick(point)}>
                  <MarkerIcon
                    point={point}
                    clickNumber={clickNumber}>
                  </MarkerIcon>
                </AdvancedMarker>
              ))}
            </div>
          }
        </>
    );
  };

  export default Markers


