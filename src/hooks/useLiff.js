import liff from "@line/liff";
import { useState, useEffect } from "react";

const useLiff = () => {
    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);

    useEffect(() => {
        const initLiff = async () => {
            try {
                await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
                if (liff.isLoggedIn()){
                    const profile = await liff.getProfile();
                    console.log(profile);
                }
                setLiffObject(liff);
            } catch (error) {
                console.log(`liff init failed: ${error}`);
                setLiffError(error.toString());
            }
        }
        initLiff();
    }, []);

    return ({ liffObject, liffError });
}

export default useLiff