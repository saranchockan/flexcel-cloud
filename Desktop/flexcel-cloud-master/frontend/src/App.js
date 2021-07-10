import React from 'react';
import './styling/App.css';
import Flow from './components/screens/Flow'
import Login from './components/screens/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/screens/LoginButton.js';
import LogoutButton from './components/screens/LogoutButton';

function App() {
	
	const {user, isAuthenticated} = useAuth0();

	if(!isAuthenticated) {
		return (<Login/>);
	} 
    
    return (
		<LogoutButton/>
	);
	
}

export default App;
