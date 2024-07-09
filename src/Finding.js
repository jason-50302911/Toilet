import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams } from "react-router-dom";
import InfoWindow from "./InfoWindow";

const Finding = ({ nearLoc, nearToilet }) => {
    const { findmode } = useParams();
    const mode = useStoreState((state) => state.mode);

    const setMode = useStoreActions((actions) => actions.setMode);
    const setClickNumber = useStoreActions((actions) => actions.setClickNumber);
    const setCenPoint = useStoreActions((actions) => actions.setCenPoint);
    const setInfoWinState = useStoreActions((actions) => actions.setInfoWinState);

    useEffect(() => {
        if (findmode === "finding")  setMode("finding");
    }, [setMode, findmode]);

    useEffect(() =>{
        if (mode === "finding") {
            if(nearToilet) setClickNumber(nearToilet);
            if (nearLoc) setCenPoint(nearLoc);
            setInfoWinState('idle');
        }
    }, [nearToilet, nearLoc, setClickNumber, mode, setCenPoint, setInfoWinState]);
    
    return (
        <InfoWindow URL={findmode}/>
    )
}

export default Finding