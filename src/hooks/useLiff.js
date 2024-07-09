import liff from "@line/liff";
import { useState, useEffect } from "react";

const useLiff = ( URL ) => {
    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);

    const desLiffID = (URL) => {
        switch (URL) {
            case "finding":
                return process.env.REACT_APP_FIND_LIFF_ID;
            case "男廁所":
                return process.env.REACT_APP_MAN_LIFF_ID;
            case "女廁所":
                return process.env.REACT_APP_WOMAN_LIFF_ID;
            case "親子廁所":
                return process.env.REACT_APP_PARENT_LIFF_ID;
            case "無障礙廁所":
                return process.env.REACT_APP_HANDICAP_LIFF_ID;
            case "性別友善廁所":
                return process.env.REACT_APP_FRIENDLY_LIFF_ID;
            default:
                return process.env.REACT_APP_BASE_LIFF_ID;
        }
    }

    useEffect(() => {

        const initLiff = async () => {
            try {
                await liff.init({ liffId: desLiffID(URL) });
                if (liff.isLoggedIn())setLiffObject(liff)
                else setLiffObject(null);
            } catch (error) {
                console.log(`liff init failed: ${error}`);
                setLiffError(error.toString());
            }
            console.log(liffObject);
        }
        initLiff();
    }, []);

    return ({ liffObject, liffError });
}

export default useLiff