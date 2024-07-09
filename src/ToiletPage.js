import React from 'react';
import { useParams } from 'react-router-dom';
import{ useStoreState, useStoreActions } from 'easy-peasy';
import useWindowSize from './hooks/useWindowSize';
import { 
    FaLocationArrow, 
    FaStar, 
    FaSearchLocation,
    FaBuilding, 
    FaRestroom, 
    FaAngleDown, 
    FaAngleRight, 
    FaAngleUp,
    FaAngleLeft } from "react-icons/fa";

const ToiletPage = () => {
    const { id } = useParams();

    const getToiletByUuId = useStoreState((state) => state.getToiletByUuId);
    const infoWinState = useStoreState((state) => state.infoWinState);

    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

    const toilet = getToiletByUuId(id);

    const { width } = useWindowSize();

    const clickCloseBtn = () => {
        if (infoWinState === 'idle') setInfoWinState(null);
        else setInfoWinState('idle');
    };

    const comments = {
        1: "廁所非常乾淨，裝潢也很舒適，讓人感覺很放鬆。",
        2: "廁所有充足的紙巾和洗手液，整體環境很整潔。", 
        3: "廁所位置很好找，標示清晰明確。",
        4: "就在市中心，非常方便，解決了我的燃眉之急。",
        5: "這裡的廁所有無障礙設施，非常方便行動不便的人士使用。",
        6: "設計非常體貼，對於帶著嬰兒車的父母來說特別方便。", 
        7: "廁所不夠乾淨，有異味，感覺使用起來不太舒服。",
        8: "地面有水漬，感覺打掃不夠及時。",
        9: "沒有足夠的衛生紙和洗手液，使用起來很不方便。",
        10: "廁所門鎖壞了，使用時感覺不安全。",
        11: "這裡的廁所經常排隊，等待時間太長了。",
        12: "高峰時間使用廁所的人太多，需要等很久。",
        13: "廁所設備看起來很舊，有些設施需要維修。",
        14: "馬桶沖水系統不好用，需要改進。",
        15: "廁所設施還算可以，基本需求都能滿足。",
        16: "沒有太大的問題，但也沒有特別驚喜。",
        17: "廁所還行，沒有什麼特別的感覺，功能正常。",
        18: "經驗中規中矩，能解決問題但沒什麼特別的亮點。",
        19: "廁所乾沒有味道。",
        20: "廁所超乾淨令人想定居。",
        21: "廁所裡卡詩擴香的芬芳。"
    }

    return (
        <>
            {toilet && 
                infoWinState === "idle" ?
                    <div className="infoContainer">
                        <div
                            className="controlWindow"
                            onClick={clickCloseBtn}>
                            {width > 800 ? <FaAngleLeft/> : <FaAngleDown/>}
                        </div>
                        <div className="infoWindow">
                            <h1>{toilet.name}</h1>
                                <div className="detailContainer">
                                    <div className="detailPart">
                                            <FaLocationArrow/>
                                            <p className="string">{toilet.address}</p>
                                        </div>
                                        <div className="detailPart">
                                            <FaStar/>
                                            {toilet.grade ? (<p className="string">{toilet.grade}</p>) : <p className="string">特優級</p>}
                                        </div>
                                        <div className="detailPart">
                                            <FaSearchLocation/>
                                            <p className="string">{toilet.type2}</p>
                                        </div>
                                        <div className="detailPart">
                                            <FaRestroom/>
                                            <p className="string">{toilet.type}</p>
                                        </div>
                                        <div className="detailPart">
                                            <FaBuilding/>
                                            <p className="string">{toilet.administration}</p>
                                        </div>
                                    </div>
                                    <ul className="commentContainer">
                                        {Object.entries(comments).map(([number, comment]) => (
                                            <li
                                                key={number}
                                                className="comment">
                                                <p>{comment}</p>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div> : 
                    (<div 
                        className="controlWindowClose">
                            {width > 800 ? 
                                <FaAngleRight 
                                    onClick={clickCloseBtn}/> 
                                : <FaAngleUp 
                                    onClick={clickCloseBtn}/>
                            }
                    </div>)
            }
        </>
    )
}

export default ToiletPage