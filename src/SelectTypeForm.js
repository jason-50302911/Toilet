import { useState } from 'react'
import { FaRestroom } from "react-icons/fa";
import { useStoreActions, useStoreState } from "easy-peasy";

const SelectTypeForm = () => {
    const [word, setWord] = useState('');
    const [clickNumber, setClickNumber] = useState([]);
    const type = useStoreState((state) => state.type);
    const setType = useStoreActions((actions) => actions.setType);

    const toiletType = {
        1: "親子廁所",
        2: "男廁所",
        3: "女廁所",
        4: "無障礙廁所", 
        5: "性別友善廁所",
        6: "混合廁所",
    };

    const handleClick = (number) => {
        let typeList = [];
        let newClickList = [];

        if (clickNumber.includes(number)) {
            newClickList = clickNumber.filter((clicked) => clicked !== number);
            typeList =  type.filter((typeNumber) => typeNumber !== number);
        } else  {
            if (clickNumber.length >= 5) return;
            newClickList = [...clickNumber, number];
            typeList = [...type, number];
        };
        setClickNumber(newClickList);
        setType(typeList);
    }

    return (
        <nav className="selectForm">
            <ul className="buttonGroup">
                {Object.entries(toiletType).map(([number, type]) => (
                    <li 
                        key={number}
                        id={type}
                        className="selectContainer">
                        <p className={number === word ? "displayWord" : "nonDisplay"}>{type}</p>
                        <button 
                            className={clickNumber.includes(number) ? "btnFocus" : "btn"}
                            onMouseOver={() => setWord(number)}
                            onMouseOut={() => setWord('')}
                            onClick={() => handleClick(number)}
                        ><FaRestroom/></button>
                    </li>))
                }
            </ul>
        </nav>
    )
}

export default SelectTypeForm