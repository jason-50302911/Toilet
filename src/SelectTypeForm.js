import { useState } from 'react';
import { FaRestroom } from "react-icons/fa";
import { useStoreActions, useStoreState } from "easy-peasy";
import useWindowSize from './hooks/useWindowSize';

const SelectTypeForm = () => {
    const [word, setWord] = useState('');

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
        if (type.includes(number)) {
            typeList =  type.filter((typeNumber) => typeNumber !== number);
        } else  {
            if (type.length >= 5) return;
            typeList = [...type, number];
        };
        setType(typeList);
    }

    return (
        <nav className="selectForm">
            <ul className="buttonGroup">
                {Object.entries(toiletType).map(([number, toiletTw]) => (
                    <li 
                        key={number}
                        id={toiletTw}
                        onMouseOut={() => setWord('')}
                        onMouseOver={() => setWord(number)}
                        className="selectContainer">
                        { width > 800 && <p className={number === word ? "displayWord" : "nonDisplay"}>{toiletType[word]}</p>}
                        <button 
                            className={type.includes(number) ? "btnFocus" : "btn"}
                            onClick={() => handleBtnClick(number)}
                        ><FaRestroom/></button>
                    </li>))
                }
            </ul>
            { width <= 800 && <p className={word ? "asideWord" : "nonAsideWord"}>{toiletType[word]}</p>}
        </nav>
    )
}

export default SelectTypeForm