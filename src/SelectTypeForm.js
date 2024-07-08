import { useState } from 'react';
import { useStoreActions, useStoreState } from "easy-peasy";
import useWindowSize from './hooks/useWindowSize';
import Friendly from "./images/friendly.png";
import Handicap from "./images/handicap.png";
import Man from "./images/man.png";
import Parent from "./images/parent.png";
import Woman from "./images/woman.png";
import Mixed from "./images/mixed.png";

const SelectTypeForm = () => {
    const [word, setWord] = useState('');

    const { width } = useWindowSize();

    const type = useStoreState((state) => state.type);
    const mapCenter = useStoreState((state) => state.mapCenter);
    
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
        <>
            {mapCenter && 
                <nav className="selectForm">
                    <ul className="buttonGroup">
                        {Object.entries(toiletType).map(([number, toiletTw]) => (
                            <li 
                                key={number}
                                id={toiletTw}
                                onTouchEnd={() => setTimeout(() => setWord(''), 500)}
                                onTouchStart={() => setWord(number)}
                                className="selectContainer">
                                { width > 800 && <p className={number === word ? "displayWord" : "nonDisplay"}>{toiletType[word]}</p>}
                                <button 
                                    className={type.includes(number) ? "btnFocus" : "btn"}
                                    onClick={() => handleBtnClick(number)}>
                                        {number === "1" ? (<img src={Man}
                                                            alt="man" width="31.35" height="37.4" title="man"/>):
                                            number === "2" ?  (<img src={Woman}
                                                                alt="woman" width="31.35" height="37.4" title="woman"/>):
                                                number === "3" ?  (<img src={Parent}
                                                                    alt="parent" width="31.35" height="37.4" title="parent"/>):
                                                    number === "4" ?  (<img src={Handicap}
                                                                        alt="handicap" width="31.35" height="37.4" title="handicap"/>):
                                                        number === "5" ?  (<img src={Friendly}
                                                                            alt="friendly" width="31.35" height="37.4" title="friendly"/>):
                                                            (<img src={Mixed} alt="mixed" width="31.35" height="37.4" title="mixed"/>)
                                        }
                                </button>
                            </li>))
                        }
                    </ul>
                    { width <= 800 && <p className={word ? "asideWord" : "nonAsideWord"}>{toiletType[word]}</p>}
                </nav>}
            </>
        )
}

export default SelectTypeForm