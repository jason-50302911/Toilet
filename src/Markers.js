import {
    useMap,
    AdvancedMarker
  } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from "easy-peasy";
import MarkerIcon from "./MarkerIcon";
import useWindowSize from './hooks/useWindowSize';

const Markers = () => {
    const map = useMap();

    const toilets = useStoreState((state) => state.toilets);
    const display = useStoreState((state) => state.display);
    const type = useStoreState((state) => state.type);
    const clickNumber = useStoreState((state) => state.clickNumber);
    const renderToilets = useStoreState((state) => state.renderToilets);

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
      setClickNumber(point.uuid);
      if (width > 800) {
        map.panTo({ lat: parseFloat(point.lat), lng: parseFloat(point.lng) - 0.0009 });
        map.setZoom(18.5);
      }
      else {
        const modifyPosition = { lat: parseFloat(point.lat - 0.002), lng: parseFloat(point.lng) };
        map.panTo(modifyPosition);
        map.setZoom(16.8);
      }
      setInfoWinState('idle');
    };
  
    return (
        <>
            {toilets && 
                (renderToilets.map((point) => (
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
                )
            ))}
        </>
    );
  };

  export default Markers


