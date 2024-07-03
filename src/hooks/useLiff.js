import liff from "@line/liff";
import { useState, useEffect } from "react";

const useLiff = () => {
    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);
    const [liffInfo, setLiffInfo] = useState(null);

    useEffect(() => {
        const initLiff = async () => {
            try {
                await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
                console.log(liff.isLoggedIn());
                if (liff.isLoggedIn()){
                    const profile = await liff.getProfile();
                    setLiffInfo(profile);
                }
                setLiffObject(liff);
            } catch (error) {
                console.log(`liff init failed: ${error}`);
                setLiffError(error.toString());
            }
        }
        initLiff();
    }, []);

    return ({ liffObject, liffError, liffInfo });
}

export default useLiff