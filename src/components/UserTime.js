import { useState, useEffect} from 'react'

const UserTime = ({setCurrentTime}) => {
    const [userTime, setUserTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            showTime()
        }, 1000);

        return () => clearInterval(interval); //This is important
    }, [userTime]);

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
            </div>
    )
}

export default UserTime
