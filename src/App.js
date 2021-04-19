import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import UserTime from './components/UserTime';
import { useState} from 'react';

function App() {
    const [confirmedTZ, setConfirmedTZ] = useState([]);
    const [currentTime, setCurrentTime] = useState([]);

    return (
        <div className='App'>
                <Header confirmedTZ={confirmedTZ} setConfirmedTZ={setConfirmedTZ} />
                <UserTime setCurrentTime={setCurrentTime}/>
                <div className='display-container container'>
                    {confirmedTZ
                        .filter((time) => time !== null)
                        .map((time, index) => (
                            <Main key={index} time={time} currentTime={currentTime}/>
                        ))}
                </div>
        </div>
    );
}

export default App;
