import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import InfoWindow from "./InfoWindow";

const Selected = () => {
    const { type } = useParams();

    const setType = useStoreActions((actions) => actions.setType);

    useEffect(() => {
        const toiletDict = {  1: "男廁所", 2: "女廁所",  3: "親子廁所",  4: "無障礙廁所", 5: "性別友善廁所", 6: "混合廁所" };
        
        const selectedType = () => {
            let numTypeList = [];
            Object.entries(toiletDict).forEach(([number, toiletTw]) => {
                if (type !== toiletTw) numTypeList.push(number);
            });
            setType(numTypeList);
        }
        selectedType();
    }, [type, setType]);

    return (
        <InfoWindow URL={type}/>
    )
} 

export default Selected