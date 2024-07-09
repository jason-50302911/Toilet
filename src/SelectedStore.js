import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import InfoWindow from "./InfoWindow";

const SelectedUse = () => {
    const { storeType } = useParams();

    const url = useStoreState((state) => state.url);

    const setUrl = useStoreActions((actions) => actions.setUrl);
    const setStoreType = useStoreActions((actions) => actions.setUsingType);

    useEffect(() => {
      console.log(storeType);
        if (storeType) setStoreType(storeType);
        if (!url) setUrl(storeType);
        
    }, [storeType, setStoreType, setUrl, url]);

    return (
        <InfoWindow />
    )
} 

export default SelectedUse