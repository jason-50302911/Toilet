import{ useStoreState, useStoreActions } from 'easy-peasy';
import Toilet from './Toilet';
import { useState, useEffect } from 'react';
import useGetDay from './hooks/useGetDay';
import { FaRestroom, FaAngleLeft, FaAngleDown, FaAngleRight, FaAngleUp } from 'react-icons/fa';
import { IoNavigateSharp } from "react-icons/io5";
import useWindowSize from './hooks/useWindowSize';
import useLiff from './hooks/useLiff';

const InfoWindow = () => {
    const searchResult = useStoreState((state) => state.searchResult);
    const renderToilets = useStoreState((state) => state.renderToilets);
    const clickNumber = useStoreState((state) => state.clickNumber);
    const infoWinState = useStoreState((state) => state.infoWinState);
    const initLocation = useStoreState((state) => state.initLocation);
    const type = useStoreState((state) => state.type);
    const url = useStoreState((state) => state.url);

    const findingSearchId = useStoreActions((actions) => actions.findingSearchId);
    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);
    const setType = useStoreActions((actions) => actions.setType);
    
    const [preClickNumber, setPreClickNumber] = useState(null);
    const [clickFloor, setClickFloor] = useState([]);
    const [info, setInfo] = useState(null);
    const [numberToilet, setNumberToilet] = useState({});
    const [floorList, setFloorList] = useState([]);
    const [displayToilet, setDisplayToilet] = useState([]);
    const [navURL, setNavURL] = useState(null);
    const [liffUrl, setLiffUrl] = useState(null);

    const { liffObject } = useLiff(liffUrl);

    const { day, hour } = useGetDay();
    const { width } = useWindowSize();

    const toiletType = {  1: "男廁所", 2: "女廁所",  3: "親子廁所",  4: "無障礙廁所", 5: "性別友善廁所", 6: "混合廁所"};
    const week = { 0: "星期日", 1: "星期一", 2: "星期二", 3: "星期三", 4: "星期四", 5: "星期五", 6: "星期六" };

    useEffect(() => {
        const numberList = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };
        if (clickNumber) {
            const information = renderToilets.find((toilet) => toilet.uuid === clickNumber);
            const orlat = initLocation.lat;
            const orlng = initLocation.lng;
            if (information !== undefined) {
                const arounding = information["aggregate"];
                const filterToilet = [];
                arounding.forEach((eachToilet) => {
                    if (clickFloor.length === 0 || clickFloor.includes(eachToilet.floor)) {
                        numberList[eachToilet.type] = true;
                        filterToilet.push(eachToilet);
                    }
                });
                setFloorList(information.floorList.sort());
                setInfo(information);
                setNumberToilet(numberList); 
                setDisplayToilet(filterToilet);
                setNavURL(`https://www.google.com/maps/dir/?api=1&origin=${orlat},${orlng}&destination=${information.lat}, ${information.lng}&travelmode=driving`);
            }
        }
    }, [renderToilets, clickNumber, clickFloor, initLocation, setInfoWinState]);

    useEffect(() => {
        if(clickNumber) setPreClickNumber(clickNumber);
        if (preClickNumber && preClickNumber !== clickNumber) {
            setClickFloor([]);
            setPreClickNumber(clickNumber);
        }

    }, [clickNumber, preClickNumber]);

    useEffect(() => {
        if (displayToilet) {
            const idArray = [];
            displayToilet.forEach((toilet) => idArray.push(toilet.id));
            findingSearchId(idArray);
        }
    }, [displayToilet, findingSearchId]);

    useEffect(() => {
        if (url === null) setLiffUrl("defalult");
        else if (url) setLiffUrl(url);
    }, [url, setLiffUrl]);



    const handleFloorClick = (floor) => {
        const floorLength = floorList.length;
        let newClickList = [];

        if (clickFloor.length + 1 === floorLength) {
            setClickFloor([]);
            return;
        };
        
        if (clickFloor.includes(floor)) {
            newClickList = clickFloor.filter((clicked) => clicked !== floor);
        } else newClickList = [...clickFloor, floor];

        setClickFloor(newClickList);
    }
    
    const clickCloseBtn = () => {
        if (displayToilet.length !== 0) {
            if (infoWinState === 'idle') setInfoWinState(null);
            else setInfoWinState('idle');
        };
    }

    const handleClick = (number, isExisted) => {
        let typeList = [];
        if (type.includes(number)) {
            typeList =  type.filter((typeNumber) => typeNumber !== number);
        } else if(isExisted)  {
            if (type.length >= 5) return;
            typeList = [...type, number];
        };
        setType(typeList);
    }

    const handleLiff = () => {
        if (liffObject && info.name) {
            liffObject.sendMessages([{
                type: "text",
                text: `廁所名稱：${info.name}\n付款編號：1242637`,
            }, ]);
            liffObject.closeWindow();
        } 
      }

    return (
        <>
            {displayToilet.length !== 0 &&
                infoWinState === "idle" ?
                    <div className="infoContainer">
                        <div
                            className="controlWindow"
                            onClick={clickCloseBtn}>
                            {width > 800 ? <FaAngleLeft/> : <FaAngleDown/>}
                        </div>
                            <div 
                                className="infoWindow">
                                <div className="titleContainer">
                                    <h1>{info.name}</h1>
                                    {info.patterns === "收費廁所" && 
                                        liffObject !== null &&
                                            <button 
                                                className="liffBtn"
                                                onClick={handleLiff}>點擊付費
                                            </button>
                                    }
                                </div>
                                <div className="smallWindow">
                                    <div className="infoDetails">
                                        <p>{info.address}</p>
                                        {info && <p>{week[day]} - { info.time[week[day]].includes(String(hour)) ? "營業中" : "休息中"}</p>}
                                        <p>使用模式 - {info.patterns}</p>
                                    </div>
                                    {navURL && 
                                        <button className="naviBtn">
                                            <a id="navigate" href={navURL}>
                                                <span className="navContent">
                                                    <IoNavigateSharp/> GO
                                                </span>
                                            </a>
                                        </button>
                                    }
                                </div>
                                <div className="floorBtnContainer">
                                    {floorList.map((floor) => (
                                        <button 
                                            className={ clickFloor.length === 0 || clickFloor.includes(floor)? "pushedFloorBtn" : "floorBtn"}
                                            key={floor}
                                            onClick={() => handleFloorClick(floor)}
                                        >{floor}</button>
                                    ))}
                                </div>
                                <ul className="toiletTypeContainer">
                                    {Object.entries(numberToilet).map(([number, bool]) => (
                                        <li 
                                            className={ bool ? "toiletSection" : "nonToiletSection"}
                                            key={number}
                                            onClick={() => handleClick(number, bool)}>
                                            <FaRestroom/>
                                        </li>
                                    ))}
                                </ul>
                                <Toilet
                                    searchResult={searchResult}
                                    spare={info.spare}
                                    liffObject={liffObject}
                                />
                            </div>
                    </div> :  
                    (<div 
                        className="controlWindowClose">
                        {displayToilet.length !== 0 && 
                            (width > 800 ? 
                                <FaAngleRight 
                                    onClick={clickCloseBtn}/> 
                                : <FaAngleUp 
                                    onClick={clickCloseBtn}/>)}
                    </div>)
            }
        </>


    )
}

export default InfoWindow