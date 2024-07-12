import{ useStoreState, useStoreActions } from 'easy-peasy';
import Toilet from './Toilet';
import { useState, useEffect } from 'react';
import useGetDay from './hooks/useGetDay';
import { FaAngleLeft, FaAngleDown, FaAngleRight, FaAngleUp } from 'react-icons/fa';
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { IoNavigateSharp } from "react-icons/io5";
import { FaMale, FaFemale } from "react-icons/fa";
import { BiFemale, BiMaleFemale } from "react-icons/bi";
import { BiHandicap } from "react-icons/bi";
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

    // const toiletType = {  1: "男廁所", 2: "女廁所",  3: "親子廁所",  4: "無障礙廁所", 5: "性別友善廁所", 6: "混合廁所"};
    const week = { 0: "星期日", 1: "星期一", 2: "星期二", 3: "星期三", 4: "星期四", 5: "星期五", 6: "星期六" };

    const goodComments = [
        { name: "陳建宏", time:"一個月前", content:"這家咖啡廳的廁所非常乾淨，裝潢也很舒適，讓人感覺很放鬆。" },
        { name: "李雅婷", time:"一星期前", content:"廁所有充足的紙巾和洗手液，整體環境很整潔。" }, 
        { name: "張志遠", time:"昨天", content:"廁所位置很好找，標示清晰明確。" },
        { name: "王美玲", time:"今天", content:"廁所乾沒有味道。"},
        { name: "林俊傑", time:"三週前", content:"廁所超乾淨令人想定居。" },
        { name: "黃慧君", time:"三天前", content:"廁所裡卡詩擴香的芬芳。" }
    ]

    const badComments = [
        { name: "楊宗翰", time:"四天前", content:"廁所不夠乾淨，有異味，感覺使用起來不太舒服。" },
        { name: "鄭嘉怡", time:"兩天前", content:"地面有水漬，感覺打掃不夠及時。" },
        { name: "吳宗憲", time:"今天", content:"沒有足夠的衛生紙和洗手液，使用起來很不方便。" },
        { name: "蔡依林", time:"一個月前", content:"廁所門鎖壞了，使用時感覺不安全。" },
        { name: "林育成", time:"昨天", content:"這裡的廁所經常排隊，等待時間太長了。" },
        { name: "張欣怡", time:"五天前", content:"高峰時間使用廁所的人太多，需要等很久。" },
        { name: "李美娟", time:"今天", content:"廁所設備看起來很舊，有些設施需要維修。" },
        { name: "朱瑞祥", time:"昨天", content:"馬桶沖水系統不好用，需要改進。" }
    ]

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
                                        {info && <p>{week[day]} - { info.time[week[day]].includes(String(hour)) || info.time[week[day]].length === 0  ? "營業中" : "休息中"}</p>}
                                        <p>使用模式 - {info.patterns}</p>
                                        {info.patterns === "收費廁所" && <p>金額 - 30元</p>}
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
                                            {number === "1" ? (<FaMale/>):
                                            number === "2" ?  (<FaFemale/>):
                                                number === "3" ?  (<MdOutlineFamilyRestroom/>):
                                                    number === "4" ?  (<BiHandicap/>):
                                                        number === "5" ?  (<BiFemale/>):
                                                            (<BiMaleFemale/>)
                                        }
                                        </li>
                                    ))}
                                </ul>
                                {info.name && <Toilet
                                    searchResult={searchResult}
                                    spare={info.spare}
                                    facilities={info.facilities}
                                    name={info.name}
                                    liffObject={liffObject}/>}
                                <div className="commentContainer">
                                    <p>評論</p>
                                    <ul className="commentContent">
                                        { info.name === "佐曼咖啡館" ? (goodComments.map((comment) => (
                                            <li
                                                key={comment.name}
                                                className="comment">
                                                <div className="profile">
                                                    <img src="https://imgur.com/2ktIXy5.jpg" alt="commenta" width="30" height="30" style={{"borderRadius": "50%", "marginRight": "0.3rem"}} title="commentator1"/>
                                                    <p style={{"fontSize": "0.65rem"}}>{comment.name}</p>
                                                </div>
                                                <p style={{"fontSize": "0.5rem"}}>{comment.time}</p>
                                                <div className="content">
                                                    <p>{comment.content}</p>
                                                </div>
                                            </li>
                                        ))):
                                        (badComments.map((comment) => (
                                            <li
                                                key={comment.name}
                                                className="comment">
                                                <div className="profile">
                                                    <img src="https://imgur.com/2ktIXy5.jpg" alt="commentb" width="30" height="30"style={{"borderRadius": "50%", "marginRight": "0.3rem"}} title="commentator1"/>
                                                    <p style={{"fontSize": "0.65rem"}}>{comment.name}</p>
                                                </div>
                                                <p style={{"fontSize": "0.5rem"}}>{comment.time}</p>
                                                <div className="content">
                                                    <p>{comment.content}</p>
                                                </div>
                                            </li>
                                        )))}
                                    </ul>
                                </div>
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