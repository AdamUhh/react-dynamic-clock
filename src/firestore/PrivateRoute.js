import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './Auth';
import '../App.css';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                currentUser ? (
                    // <Redirect to={'/'} /> //Redirect to Home anyway
                    <RouteComponent /> //...routeProps unnecessary
                ) : (
                    // <Redirect to={'/'} />
                    //This is the component, so its <Home />
                    <RouteComponent /> //...routeProps unnecessary
                )
            }
        />
    );
};

export default PrivateRoute;
