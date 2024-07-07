import React from 'react';
import { Link } from "react-router-dom";
import { FaRestroom } from "react-icons/fa";
import ToiletPin from "./images/toiletPin.png";

const MarkerIcon = ({ point, clickNumber }) => {
    return (
        <Link to={`/place/${point.uuid}`}>
            <span className={point.uuid === clickNumber ? "clickMarker": "markers"}>
                {clickNumber === point.uuid  ? 
                    (<img src={ToiletPin}
                        alt="smallogo" width="18.21" height="28.74" title="Logo"/>):
                    (<img src={ToiletPin}
                        alt="smallogo" width="12.14" height="19.16" title="Logo"/>)
                    }
            </span>
        </Link>
    )
}

export default MarkerIcon
