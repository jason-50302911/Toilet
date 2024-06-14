import React from 'react';
import { useStoreState } from 'easy-peasy';
import { useParams } from 'react-router-dom';
import { FaLocationArrow, FaStar, FaSearchLocation, FaBuilding, FaRestroom } from "react-icons/fa";

const ToiletPage = () => {
    const { id } = useParams();
    const getToiletByUuId = useStoreState((state) => state.getToiletByUuId);

    const toilet = getToiletByUuId(id);

    return (
        <>
             {toilet && 
                <main className="toiletPage">
                    <h2>{toilet.name}</h2>
                    <ul className="detailContainer">
                        <li className="detailPart">
                            <FaLocationArrow/>
                            <p className="string">{toilet.address}</p>
                        </li>
                        <li className="detailPart">
                            <FaStar/>
                            <p className="string">{toilet.grade}</p>
                        </li>
                        <li className="detailPart">
                            <FaSearchLocation/>
                            <p className="string">{toilet.type2}</p>
                        </li>
                        <li className="detailPart">
                            <FaRestroom/>
                            <p className="string">{toilet.type}</p>
                        </li>
                        <li className="detailPart">
                            <FaBuilding/>
                            <p className="string">{toilet.administration}</p>
                        </li>
                    </ul>
                </main>
            }
        </>
    )
}

export default ToiletPage