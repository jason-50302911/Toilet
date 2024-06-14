import {
    useMap,
    AdvancedMarker
  } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaRestroom } from "react-icons/fa";
import { useStoreActions } from 'easy-peasy';
import { useStoreState } from "easy-peasy";

const Markers = () => {
    const map = useMap();
    const [clickNumber, setClickNumber] = useState(null);
    const [renderToilets, setRenderToilets] = useState([]);

    const toilets = useStoreState((state) => state.toilets);
    const display = useStoreState((state) => state.display);

    const findingSearchId = useStoreActions((actions) => actions.findingSearchId);

    useEffect(() => {
      setRenderToilets(toilets);
    }, [toilets, setRenderToilets]);

    const handleClick = (point) => {
      setClickNumber(point.uuid);
      map.panTo({ lat: parseFloat(point.lat + 0.01), lng: parseFloat(point.lng) });
      map.setZoom(17.5);
      findingSearchId(point.id);
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
                      // ref={(marker) => setMarkerRef(marker, point.key)}
                      onClick={() => handleClick(point)}> 
                      <Link to={`/place/${point.uuid}`}>
                      { point.id.length === 1 ? (
                        <span className={clickNumber === point.uuid ? "clickMarker": "markers"}>
                          <FaRestroom />
                        </span>) : 
                        (
                          <span className={clickNumber === point.uuid ? "clickMarker": "markers"}>
                            {point.id.length}
                          </span>
                        )
                      }
                      </Link>
                    </AdvancedMarker>
                )
            ))}
        </>
    );
  };

  export default Markers


