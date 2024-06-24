import {
    useMap,
    AdvancedMarker
  } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from "easy-peasy";
import MarkerIcon from "./MarkerIcon";

const Markers = () => {
    const map = useMap();
    const [clickNumber, setClickNumber] = useState(null);
    const [renderToilets, setRenderToilets] = useState([]);

    const toilets = useStoreState((state) => state.toilets);
    const display = useStoreState((state) => state.display);
    const type = useStoreState((state) => state.type);

    const findingSearchId = useStoreActions((actions) => actions.findingSearchId);

    useEffect(() => {
      let cpToilet = [...toilets];
      cpToilet.forEach((toilet) => {
        const categroy = toilet.categroy;
        const filtered = categroy.filter((idType) =>  !(type.includes(String(idType.type))));
        if (filtered.length === 0) {
          const filterToilets = cpToilet.filter((refToilet) =>  refToilet.uuid !== toilet.uuid);
          cpToilet = [...filterToilets];
        } else {
          toilet.categroy = [...filtered];
        }
      });
      setRenderToilets(cpToilet);
    }, [toilets, setRenderToilets, type]);

    const idParser = (point) => {
      const emptyArray = [];
      point.categroy.map((idInfo) => emptyArray.push(idInfo.id));
      return emptyArray;
    }

    const handleClick = (point) => {
      const idArray = idParser(point);
      setClickNumber(point.uuid);
      map.panTo({ lat: parseFloat(point.lat + 0.01), lng: parseFloat(point.lng) });
      map.setZoom(17.5);
      findingSearchId(idArray);
    };
  
    return (
        <>
            {toilets && 
                (renderToilets.map((point) => (
                    <AdvancedMarker
                      position={{lat: parseFloat(point.lat), lng: parseFloat(point.lng)}}
                      className={display ? "markerContainer" : "notDisplay"}
                      key={point.uuid}
                      id={point.uuid}
                      onClick={() => handleClick(point)}> 
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


