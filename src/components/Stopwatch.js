import { useState, useEffect } from 'react';
const Stopwatch = (props) => {
    const [status, setStatus] = useState(0); // stopped = 0, started = 1
    const [OGTimeStartedOn, setOGTimeStartedOn] = useState('');

    const [timeStartedOn, setTimeStartedOn] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);

    const [stopwatchTime, setStopwatchTime] = useState('00:00:00');

    useEffect(() => {
        if (status === 1) {
            let t = props.currentTime.getTime() - timeStartedOn; //Average is around 1010-1020ms
            setElapsedTime(elapsedTime + ((t < 1100) ? 1000 : t));
            setTimeStartedOn(Date.now());
            updateStopwatch();
        }
    }, [props.currentTime, status]);

    const updateStopwatch = () => {
        // console.log(elapsedTime);
        let tempTime = elapsedTime;
        tempTime = Math.floor(tempTime / 1000);
        let s = tempTime % 60;
        tempTime = Math.floor(tempTime / 60);
        let m = tempTime % 60;
        tempTime = Math.floor(tempTime / 60);
        let h = tempTime % 60;

        setStopwatchTime(`${checkTime(h)}:${checkTime(m)}:${checkTime(s)}`);
    };

    const startStop = () => {
        if (status === 0) {
            //if clock is not running and user presses start, run() every 1 second
            if (OGTimeStartedOn.length < 1) getCurrentTime();
            setTimeStartedOn(props.currentTime.getTime());

            setStatus(1);

            document.querySelector('#start').classList.toggle('stop');
        } else {
            setTimeStartedOn(props.currentTime.getTime());

            setStatus(0);

            document.querySelector('#start').classList.toggle('stop');
        }
    };

    const reset = () => {
        setStatus(0);
        setElapsedTime(0);
        setTimeStartedOn(0);
        setStopwatchTime(`00:00:00`);

        //If you click reset while the clock is working, toggle the class 'stop' to make it turn back to green
        if (document.querySelector('#start').classList.contains('stop')) document.querySelector('#start').classList.toggle('stop');
        if (OGTimeStartedOn.length > 0) setOGTimeStartedOn('');
    };

    const getCurrentTime = () => {
        let time = new Date();
        let THour = time.getHours();
        let a_p = '';

        if (THour === 0) {
            THour = 12;
            a_p = 'am';
        }
        if (THour > 12) {
            THour = THour - 12;
            a_p = 'pm';
        }
        setOGTimeStartedOn(`${checkTime(THour)}:${checkTime(time.getMinutes())}:${checkTime(time.getSeconds())} ${a_p}`);
        // setTimeStartedOn(time.getTime());
    };

    function checkTime(i) {
        /*add 0 before any single digit*/
        return i < 10 ? '0' + i : i;
    }

    return (
        <div className='stopwatch-container container'>
            <div className='stopwatch-startedOn'>
                {OGTimeStartedOn.length > 0 && (
                    <span>
                        Started at
                        <br />
                        {OGTimeStartedOn}
                    </span>
                )}
            </div>
            <div id='stopwatch-time'>
                <span id='hour'>{stopwatchTime}</span>
                {/* <span id='min'>:</span> :<span id='sec'></span> */}
            </div>

            <ul className='stopwatch-options'>
                <li>
                    <button id='start' onClick={startStop}>
                        {status === 1 ? 'Stop' : 'Start'}
                    </button>
                </li>
                <li>
                    <button className='reset' onClick={reset}>
                        Reset
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Stopwatch;
