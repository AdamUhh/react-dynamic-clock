import {useState, useRef} from 'react';
import Select from 'react-dropdown-select';
import { options } from './options2';


const Header = ({ confirmedTZ, setConfirmedTZ }) => {
    const [selectedTZ, setSelectedTZ] = useState([]);

    // Used to get the reference of Select
    const selectInputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        setConfirmedTZ([...confirmedTZ, selectedTZ]);
        selectInputRef.current.clearAll();

        // selectInputRef.current.select.clearValue(); // if you use react-select instead of react-dropdown-select
    };

    return (
        <div className='header-box container'>
            <div className='header-title'>Add a clock</div>
            <div className='select-time-container'>
                <form className='form-container' onSubmit={onSubmit}>
                    <Select
                        ref={selectInputRef}
                        key={options}
                        options={options}
                        onChange={(obj) => {
                            setSelectedTZ(obj !== null && Object.keys(obj).length > 0 ? obj[0].value : null);
                        }}
                    />
                    <button>Add Clock</button>
                </form>
            </div>
        </div>
    );
};

export default Header;
