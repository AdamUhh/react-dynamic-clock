import './App.css';
import Select from 'react-dropdown-select';
import Main from './components/Main';
import UserTime from './components/UserTime';
import { options } from './components/options2';
import { useState, useRef, useEffect, createContext } from 'react';


function App() {
    const [confirmedTZ, setConfirmedTZ] = useState([]);
    const [selectedTZ, setSelectedTZ] = useState([]);

    // Used to get the reference of Select
    const selectInputRef = useRef();




    const onSubmit = (e) => {
        e.preventDefault();
        setConfirmedTZ((confirmedTZ) => [...confirmedTZ, selectedTZ]);
        selectInputRef.current.clearAll();

        // selectInputRef.current.select.clearValue(); // if you use react-select instead of react-dropdown-select
    };

    return (
        <div className='App'>
            <div className='header-box container'>
                <div className='header-title'>Add a clock</div>
                <div className='select-time-container'>
                    <form className='form-container' onSubmit={onSubmit}>
                        <Select
                            ref={selectInputRef}
                            key={options}
                            options={options}
                            // clearable={true}
                            onChange={(obj) => {
                                setSelectedTZ(obj !== null && Object.keys(obj).length > 0 ? obj[0].value : null);
                            }}
                        />
                        <button>Add Clock</button>
                    </form>
                </div>
            </div>
            <UserTime />
            <div className='display-container container'>
                {confirmedTZ
                    .filter((time) => time !== null)
                    .map((time, index) => (
                        <Main key={index} time={time} />
                    ))}
            </div>
        </div>
    );
}

export default App;
