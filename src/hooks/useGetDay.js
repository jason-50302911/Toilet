import { useState, useEffect } from 'react';

const useGetDay = () => {
    const [day, setDay] = useState('');

    useEffect(() => {
        const getDay = () => {
            const now = new Date().getDay();
            setDay(now);
        }
        getDay();
    }, []);

    return day;
}

export default useGetDay