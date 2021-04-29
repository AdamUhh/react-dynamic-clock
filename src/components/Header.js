import { useState, useRef, useContext } from 'react';
import Select from 'react-dropdown-select';
import { options } from './options2';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { AuthContext } from '../firestore/Auth';
import { firestore, auth } from '../firestore/base';

const Header = ({ confirmedTZ, setConfirmedTZ }) => {
    const [selectedTZ, setSelectedTZ] = useState();
    const [queryLogin, setQueryLogin] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // Used to get the reference of Select
    const selectInputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        if (selectedTZ) {
            console.log(selectedTZ)
            setConfirmedTZ([...confirmedTZ, selectedTZ]);
            selectInputRef.current.clearAll();

            // selectInputRef.current.select.clearValue(); // if you use react-select instead of react-dropdown-select

            //save to firebase
            if (currentUser !== null)
                firestore
                    .collection('Users')
                    .doc(currentUser.uid)
                    // .collection('StoredTimezones').doc('dummy')
                    .set({ storedTZ: [...confirmedTZ, selectedTZ] });
        }
    };

    function handleLogin() {
        setQueryLogin(true);
    }
    return (
        <Route>
            {/* If user clicks the login btn and there is no user, redirect to the login page, else sign out */}
            {queryLogin && !currentUser ? (
                <Redirect to='/login' />
            ) : (
                <div className='header-box container'>
                    <div className='login-container'>
                        {currentUser ? (
                            <svg className='logout' onClick={() => auth.signOut()} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                <path d='M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z' />
                            </svg>
                        ) : (
                            <svg className='login' onClick={handleLogin} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                <path d='M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z' />
                            </svg>
                        )}
                    </div>
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
            )}
        </Route>
    );
};

export default Header;
