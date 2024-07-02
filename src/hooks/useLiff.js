import liff from "@line/liff";
import { useState, useEffect } from "react";

const useLiff = () => {
    const [liffObject, setLiffObject] = useState(null);
    const [liffError, setLiffError] = useState(null);

    useEffect(() => {
        liff
        .init({ liffId: process.env.REACT_APP_LIFF_ID })
        .then(() => setLiffObject(liff))
        .catch((error) => setLiffError(error.toString));
    }, []);
    
    return ({ liffObject, liffError });
}

export default useLiff