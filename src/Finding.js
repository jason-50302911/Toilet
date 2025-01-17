import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams } from "react-router-dom";
import InfoWindow from "./InfoWindow";

const Finding = ({ nearLoc, nearToilet }) => {
    const { findMode } = useParams();
    const mode = useStoreState((state) => state.mode);

    const setMode = useStoreActions((actions) => actions.setMode);
    const setClickNumber = useStoreActions((actions) => actions.setClickNumber);
    const setCenPoint = useStoreActions((actions) => actions.setCenPoint);
    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);
    const setUrl = useStoreActions((actions) => actions.setUrl);

    useEffect(() => {
        if (findMode === "finding")  {
            setMode("finding");
            setUrl(findMode);
        }
    }, [setMode, findMode, setUrl]);

    useEffect(() =>{
        if (mode === "finding") {
            if(nearToilet) setClickNumber(nearToilet);
            if (nearLoc) setCenPoint(nearLoc);
            setInfoWinState('idle');
        }
    }, [nearToilet, nearLoc, setClickNumber, mode, setCenPoint, setInfoWinState]);
    
    return (
        <InfoWindow/>
    )
}

export default Finding