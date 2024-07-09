import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import InfoWindow from "./InfoWindow";

const SelectedUse = () => {
    const { useType } = useParams();

    const url = useStoreState((state) => state.url);

    const setUrl = useStoreActions((actions) => actions.setUrl);
    const setUsingType = useStoreActions((actions) => actions.setUsingType);

    useEffect(() => {
        setUsingType(useType);
        if (!url) setUrl(useType);
    }, [useType, setUsingType, setUrl, url]);

    return (
        <InfoWindow />
    )
} 

export default SelectedUse