import { useState, useEffect } from 'react';

const Main = ({ time }) => {
    const [newTime, setNewTime] = useState('');

    useEffect(() => {
        setNewTime(new Date().toLocaleString('en-US', { timeZone: time }).split(","));
        setInterval(() => {
            setNewTime(new Date().toLocaleString('en-US', { timeZone: time }).split(","));
        }, 1000);
    }, []);

    return (
        <div className='clock-container'>

            <div className='clock-time'>{newTime[1]}</div>
            <div className='clock-date'>{newTime[0]}</div>
            <div className="clock-title">{time}</div>
        </div>
    );
};

export default Main;
