import liff from "@line/liff";
import { useState, useEffect } from "react";

const useLiff = (inputUrl) => {
    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);

    const desLiffID = (url) => {
        switch (url) {
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
            case "友善借用":
                return process.env.REACT_APP_BORROW_LIFF_ID;
            case "顧客使用":
                return process.env.REACT_APP_CUSTOMER_LIFF_ID;
            case "收費廁所":
                return process.env.REACT_APP_MONEY_LIFF_ID;
            case "開放使用":
                return process.env.REACT_APP_OPEN_LIFF_ID;
            case "公廁":
                return process.env.REACT_APP_PUBLIC_LIFF_ID;
            case "便利商店":
                return process.env.REACT_APP_CONVENIENT_LIFF_ID;
            case "一般商家":
                return process.env.REACT_APP_NORNMAL_LIFF_ID;
            case "連鎖商店":
                return process.env.REACT_APP_CHAIN_LIFF_ID;;    
            default:
                return process.env.REACT_APP_BASE_LIFF_ID;
        }
    }

    useEffect(() => {
        const initLiff = async (url) => {
            try {
                await liff.init({ liffId: desLiffID(url) });
                if (liff.isLoggedIn())setLiffObject(liff)
                else setLiffObject(null);
            } catch (error) {
                console.log(`liff init failed: ${error}`);
                setLiffError(error.toString());
            }
        }
        if (inputUrl !== null && inputUrl !== undefined) initLiff(inputUrl);
    }, [inputUrl]);

    return ({ liffObject, liffError });
}

export default useLiff