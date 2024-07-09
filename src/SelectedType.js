import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import InfoWindow from "./InfoWindow";

const SelectedType = () => {
    const { type } = useParams();

    const url = useStoreState((state) => state.url);

    const setUrl = useStoreActions((actions) => actions.setUrl);
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
        if (!url) setUrl(type);
    }, [type, setType, setUrl, url]);

    return (
        <InfoWindow />
    )
} 

export default SelectedType