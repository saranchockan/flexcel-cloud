import React from 'react';
import './styling/App.css';
import Flow from './components/screens/Flow'
import Login from './components/screens/Login';
import LoginButton from './components/screens/LoginButton';
import LogoutButton from './components/screens/LogoutButton';

function App() {

	/*if(!isAuthenticated) {
		return (<Login/>);
	} 
    
    return (
		<LogoutButton/>
	);*/
	return <Flow/>;
	
}

export default App;
