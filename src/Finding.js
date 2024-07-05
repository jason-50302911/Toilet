import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams } from "react-router-dom";
import InfoWindow from "./InfoWindow";

const Finding = ({ nearLoc, nearToilet, liffObject }) => {
    const { findMode } = useParams();
    const mode = useStoreState((state) => state.mode);

    const setMode = useStoreActions((actions) => actions.setMode);
    const setClickNumber = useStoreActions((actions) => actions.setClickNumber);
    const setCenPoint = useStoreActions((actions) => actions.setCenPoint);
    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

    useEffect(() => {
        const setFindMode = findMode.split("=")[1];
        if (setFindMode === "finding")  setMode("finding");
    }, [setMode, findMode]);

    useEffect(() =>{
        if (mode === "finding") {
            if(nearToilet) setClickNumber(nearToilet);
            if (nearLoc) setCenPoint(nearLoc);
            setInfoWinState('idle');
        }
    }, [nearToilet, nearLoc, setClickNumber, mode, setCenPoint, setInfoWinState]);
    
    return (
        <InfoWindow liffObject={liffObject}/>
    )
}

export default Finding