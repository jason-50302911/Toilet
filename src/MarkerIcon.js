import React from 'react';
import { Link } from "react-router-dom";
import { FaRestroom } from "react-icons/fa";

const MarkerIcon = ({ point, clickNumber }) => {
    return (
        <Link to={`/place/${point.uuid}`}>
            <span className={point.uuid === clickNumber ? "clickMarker": "markers"}>
                <FaRestroom />
            </span>
        </Link>
    )
}

export default MarkerIcon
