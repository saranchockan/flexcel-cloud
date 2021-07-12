import React from 'react';
import './styling/App.css';
import Flow from './components/screens/Flow'
import Login from './components/screens/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './components/parts/Buttons/LogoutButton';

function App() {
	
	const {user, isAuthenticated} = useAuth0();
    const { loginWithRedirect } = useAuth0();

	if(!isAuthenticated) {
		return <Login></Login>
	}
	
	return <LogoutButton></LogoutButton>

}

export default App;
