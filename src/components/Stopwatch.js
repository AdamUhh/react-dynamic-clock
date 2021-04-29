import { useState } from 'react';
const Stopwatch = () => {
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(2);
    // started = 1
    // stopped = 2

    const startStop = () => {
        if (status === 2) { //if clock is not running and user presses start, run() every 1 second
            run();
            setStatus(1);
            setInterv(setInterval(run, 1000));
            document.querySelector('#start').classList.toggle('stop');
        } else {
            clearInterval(interv);
            setStatus(2);
            document.querySelector('#start').classList.toggle('stop');
        }
    };

    var updatedS = time.s,
        updatedM = time.m,
        updatedH = time.h;

    const run = () => {
        updatedS++;

        // If seconds reach 60s, reset it to 0 and add 1 to minutes
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }

        // If minutes reach 60m, reset it to 0 and add 1 to hours
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }

        return setTime({s: updatedS, m: updatedM, h: updatedH });
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(2);
        setTime({s: 0, m: 0, h: 0 });
    };

    return (
        <div className='stopwatch-container container'>
            <div id='stopwatch-time'>
                <span id='hour'>{time.h < 10 ? (`0${time.h}`) : (`${time.h}`)}</span> :
                <span id='min'> {time.m < 10 ? (`0${time.m}`) : (`${time.m}`)}</span> :
                <span id='sec'> {time.s < 10 ? (`0${time.s}`) : (`${time.s}`)}</span>
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
