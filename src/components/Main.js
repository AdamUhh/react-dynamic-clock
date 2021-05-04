import { useState, useEffect, useContext } from 'react';
import { firestore } from '../firestore/base';
import { AuthContext } from '../firestore/Auth';

const Main = ({ time, confirmedTZ, setConfirmedTZ, currentTime }) => {
    const [newTime, setNewTime] = useState('');
    const [timeDifference, setTimeDifference] = useState('');
    const { currentUser } = useContext(AuthContext);

    var timeZoneOffset = () => {
        const timezoneTime = currentTime.toLocaleString('en-US', { timeZone: time });
        const offset = new Date(timezoneTime);
        const timezoneArr = timezoneTime.split(',');
        const TimeDifference = currentTime.getHours() - offset.getHours();
        const TimeDateDifference = Math.abs(Math.floor((currentTime.getTime() - offset.getTime()) / (60 * 60 * 1000)));

        setNewTime([`${offset.getDate() + '/' + (offset.getMonth() + 1) + '/' + offset.getFullYear()}`, timezoneArr[1]]);

        if (TimeDifference > 0) setTimeDifference('You are ' + (TimeDifference > 1 ? TimeDifference + ' Hours Ahead' : TimeDifference + ' Hour Ahead'));
        else if (currentTime.getDate() - offset.getDate() > 0)
            setTimeDifference('You are ' + (TimeDateDifference > 1 ? TimeDateDifference + ' Hours Ahead' : TimeDateDifference + ' Hour Ahead'));
        else setTimeDifference('You are ' + (Math.abs(TimeDifference) > 1 ? Math.abs(TimeDifference) + ' Hours Behind' : Math.abs(TimeDifference) + ' Hour Behind'));
    };

    useEffect(() => {
        // used to remove first 1 second delay when adding clock
        timeZoneOffset();
        const interval = setInterval(() => {
            timeZoneOffset();
        }, 1000);

        return () => clearInterval(interval); //This is important
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, time]);

    function deleteTZ() {
        const deletedTZ = confirmedTZ.filter((e) => e !== time);
        setConfirmedTZ(deletedTZ);

        //update firebase
        if (currentUser) {
            firestore
                .collection('Users')
                .doc(currentUser.uid)
                // .collection('StoredTimezones')
                // .doc('dummy')
                .update({ storedTZ: deletedTZ });
        }
    }

    return (
        <div className='clock-container'>
            <div className='clock-difference'>{timeDifference}</div>
            <div className='clock-time'>{newTime[1]}</div>
            <div className='clock-date'>{newTime[0]}</div>
            <div className='clock-title'>{time.replace("_", " ")}</div>
            <div className='clock-delete'>
                <svg onClick={deleteTZ} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                    <path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z' />
                </svg>
            </div>
        </div>
    );
};

export default Main;
