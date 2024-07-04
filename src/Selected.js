import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";

const Selected = () => {
    const { condition } = useParams();

    const setType = useStoreActions((actions) => actions.setType);

    useEffect(() => {
        const toiletDict = {  1: "男廁所", 2: "女廁所",  3: "親子廁所",  4: "無障礙廁所", 5: "性別友善廁所", 6: "混合廁所" };
        
        const selectedType = () => {
            const toiletType = condition.split("=")[1];
            let numTypeList = [];
            Object.entries(toiletDict).forEach(([number, toiletTw]) => {
                if (toiletType !== toiletTw) numTypeList.push(number);
            });
            setType(numTypeList);
        }
        selectedType();
    }, [condition, setType]);
} 

export default Selected