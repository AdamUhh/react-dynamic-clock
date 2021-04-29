import { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';

const UserTime = ({ setCurrentTime }) => {
    const [userTime, setUserTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            showTime();
        }, 1000);

        return () => clearInterval(interval); //This is important
    }, [showTime]); // updated every 1 second from showTime()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function showTime() {
        var a_p = '';
        var today = new Date();
        setCurrentTime(today);
        var current_hour = today.getHours();

        a_p = current_hour < 12 ? 'AM' : 'PM';

        if (current_hour === 0) {
            current_hour = 12;
        }

        if (current_hour > 12) {
            current_hour = current_hour - 12;
        }

        setUserTime([checkTime(current_hour) + ' : ' + checkTime(today.getMinutes()) + ' : ' + checkTime(today.getSeconds()), a_p, checkDates()]);
        function checkTime(i) {
            /*add 0 before any single digit*/
            return i < 10 ? '0' + i : i;
        }

        function checkDates() {
            var current_day = today.getDay();
            var dayArr = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            current_day = dayArr[current_day];

            var current_month = today.getMonth();
            var monthArr = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            current_month = monthArr[current_month];

            var text = today.getDate() + ' ' + current_day + ' ' + current_month;
            return text;
        }
    }
    function btnHandler() {
        document.querySelector('.stopwatch-container').classList.toggle('display');
    }

    return (
        <div className='locale-container container'>
            <div className='locale-body'>
                <div className='locale-wrapper'>
                    <div className='locale-time'>{userTime[0]}</div>
                    {userTime[1] === 'AM' ? (
                        <div className='locale-ampm'>
                            <p>{userTime[1]}</p>
                            <span className='faded'>PM</span>
                        </div>
                    ) : (
                        <div className='locale-ampm'>
                            <p className='faded'>AM</p>
                            <span>{userTime[1]}</span>
                        </div>
                    )}
                </div>
                <div className='locale-date'>{userTime[2]}</div>
            </div>
            <div className='stopwatch-icon' >
                <svg onClick={btnHandler} xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 1792 1792'>
                    <path d='M1024 544v448q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h224v-352q0-14 9-23t23-9h64q14 0 23 9t9 23zm416 352q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z' />
                </svg>
            </div>
            <hr />

            <Stopwatch />
        </div>
    );
};

export default UserTime;
