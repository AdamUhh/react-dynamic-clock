// import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './firestore/Home';
import Login from './firestore/Login';
import { AuthProvider } from './firestore/Auth';
import PrivateRoute from './firestore/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
