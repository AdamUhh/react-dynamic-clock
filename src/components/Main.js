import { useState, useEffect, useContext } from 'react';
const Main = ({ time, currentTime }) => {
    const [newTime, setNewTime] = useState('');

    useEffect(() => {
        setNewTime(currentTime.toLocaleString('en-US', { timeZone: time }).split(','));
        const interval = setInterval(() => {
            setNewTime(currentTime.toLocaleString('en-US', { timeZone: time }).split(','));
        }, 1000);

        return () => clearInterval(interval); //This is important
    }, [currentTime]);
    return (
        <div className='clock-container'>
            <div className='clock-time'>{newTime[1]}</div>
            <div className='clock-date'>{newTime[0]}</div>
            <div className='clock-title'>{time}</div>
        </div>
    );
};

export default Main;
