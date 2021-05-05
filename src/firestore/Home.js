import React from 'react';
import Main from '../components/Main';
import Header from '../components/Header';
import UserTime from '../components/UserTime';
import { useState, useEffect, useContext } from 'react';
import { firestore } from './base';
import { AuthContext } from './Auth';

export const Home = () => {
    const [confirmedTZ, setConfirmedTZ] = useState([]);
    const [currentTime, setCurrentTime] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const fetchTime = async () => {
        // firestore
        //     .collection('Users')
        //     .doc(currentUser.uid)
        //     .collection('StoredTimezones')
        //     .get()
        //     .then((snapshot) => {
        //         if (snapshot)
        //             snapshot.docs.forEach((doc) => {
        //                 if (Object.entries(doc.data()).length !== 0) setConfirmedTZ(doc.data().storedTZ);
        //             });
        //     });
        const storedTimezones = firestore.collection('Users').doc(currentUser.uid);
        const doc = await storedTimezones.get();
        if (doc.exists) {
            if (Object.entries(doc.data()).length !== 0) setConfirmedTZ(doc.data().storedTZ);
        }
    };

    useEffect(() => {
        if (currentUser) fetchTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='App'>
            {/* CHECK IF ITS BECAUSE CONFIRMEDTZ LENGTH IS FASTER THAN USERTIME! */}
            <Header confirmedTZ={confirmedTZ} setConfirmedTZ={setConfirmedTZ} />
            <UserTime currentTime={currentTime} setCurrentTime={setCurrentTime} />


            {confirmedTZ.length > 0 && currentTime > 0 && (
                <>
                    <div className='display-container container'>
                        {confirmedTZ
                            .filter((time) => time !== null)
                            .map((time, index) => (
                                <Main key={index} time={time} confirmedTZ={confirmedTZ} setConfirmedTZ={setConfirmedTZ} currentTime={currentTime} />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
