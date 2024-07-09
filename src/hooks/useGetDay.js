import { useState, useEffect } from 'react';

const useGetDay = () => {
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');

    useEffect(() => {
        const getDayInfo = () => {
            const now = new Date()
            const week = now.getDay();
            const nowHour = now.getHours();
            setDay(week);
            setHour(nowHour);
        }
        getDayInfo();
    }, []);

    return { day, hour };
}

export default useGetDay