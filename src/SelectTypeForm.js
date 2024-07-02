import { useState } from 'react'
import { FaRestroom } from "react-icons/fa";
import { useStoreActions, useStoreState } from "easy-peasy";
import useWindowSize from './hooks/useWindowSize';

const SelectTypeForm = () => {
    const [word, setWord] = useState('');
    const [clickTypeNumber, setClickTypeNumber] = useState([]);

    const { width } = useWindowSize();

    const type = useStoreState((state) => state.type);
    const setType = useStoreActions((actions) => actions.setType);


    const toiletType = {
        1: "男廁所",
        2: "女廁所",
        3: "親子廁所",
        4: "無障礙廁所", 
        5: "性別友善廁所",
        6: "混合廁所",
    };
    

    const handleBtnClick = (number) => {
        let typeList = [];
        let newClickList = [];
        if (clickTypeNumber.includes(number)) {
            newClickList = clickTypeNumber.filter((clicked) => clicked !== number);
            typeList =  type.filter((typeNumber) => typeNumber !== number);
        } else  {
            if (clickTypeNumber.length >= 5) return;
            newClickList = [...clickTypeNumber, number];
            typeList = [...type, number];
        };
        setClickTypeNumber(newClickList);
        setType(typeList);
    }

    return (
        <nav className="selectForm">
            <ul className="buttonGroup">
                {Object.entries(toiletType).map(([number, type]) => (
                    <li 
                        key={number}
                        id={type}
                        onMouseOut={() => setWord('')}
                        onMouseOver={() => setWord(number)}
                        className="selectContainer">
                        { width > 800 && <p className={number === word ? "displayWord" : "nonDisplay"}>{type}</p>}
                        <button 
                            className={clickTypeNumber.includes(number) ? "btnFocus" : "btn"}
                            onClick={() => handleBtnClick(number)}
                        ><FaRestroom/></button>
                    </li>))
                }
            </ul>
            { width <= 800 && <p className={word ? "displayAsideWord" : "nonAsideDisplay"}>{toiletType[word]}</p>}
        </nav>
    )
}

export default SelectTypeForm