import React from 'react';
import { Link } from "react-router-dom";
import ToiletPin from "./images/toiletPin.png";

const MarkerIcon = ({ point, clickNumber }) => {


    return (
        <Link to={`/place/${point.uuid}`}>
            <span className={point.uuid === clickNumber ? "clickMarker": 
                    point.patterns === "收費廁所" ? "yellowMarker":
                        point.patterns === "友善借用" ? "deepBlueMarker": 
                            point.patterns === "顧客使用" ? "greenMarker": "markers"
            }>
                {clickNumber === point.uuid  ? 
                    (<img src={ToiletPin}
                        alt="smallogo" width="19" height="29" title="Logo"/>):
                    (<img src={ToiletPin}
                        alt="smallogo" width="14" height="21" title="Logo"/>)
                    }
            </span>
        </Link>
    )
}

export default MarkerIcon
