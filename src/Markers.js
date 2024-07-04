import {
    useMap,
    AdvancedMarker
  } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from "easy-peasy";
import MarkerIcon from "./MarkerIcon";
import useWindowSize from './hooks/useWindowSize';
import { FaArrowCircleDown } from "react-icons/fa";

const Markers = () => {
    const map = useMap();

    const toilets = useStoreState((state) => state.toilets);
    const display = useStoreState((state) => state.display);
    const type = useStoreState((state) => state.type);
    const clickNumber = useStoreState((state) => state.clickNumber);
    const renderToilets = useStoreState((state) => state.renderToilets);
    const initLocation = useStoreState((state) => state.initLocation);

    const { width } = useWindowSize();

    const setRenderToilets = useStoreActions((actions) => actions.setRenderToilets);
    const setClickNumber = useStoreActions((actions) => actions.setClickNumber);
    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

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
      setRenderToilets(cpToilet);
    }, [toilets, setRenderToilets, type]);

    const handleOnClick = (point) => {
      const plat = point.lat;
      const plng = point.lng;
      if (width > 800) {
        map.panTo({ lat: parseFloat(plat), lng: parseFloat(plng) - 0.0009 });
        map.setZoom(17);
      }
      else {
        const modifyPosition = { lat: parseFloat(plat - 0.002), lng: parseFloat(plng) };
        map.panTo(modifyPosition);
        map.setZoom(16.8);
      }

      setClickNumber(point.uuid);
      setInfoWinState('idle');
    };
  
    return (
        <>
          {toilets && 
            <div>
              <AdvancedMarker position={{ lat: parseFloat(initLocation.lat), lng: parseFloat(initLocation.lng) }}>
                <span className="nowLocation">
                  <FaArrowCircleDown/>
                </span>
              </AdvancedMarker>
              {renderToilets.map((point) => (
                <AdvancedMarker
                  position={{lat: parseFloat(point.lat), lng: parseFloat(point.lng)}}
                  className={display ? "markerContainer" : "notDisplay"}
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


