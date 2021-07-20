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
		if(document.getElementById('login') != null) {
			window.onload = function(){
				document.getElementById('login').click();
			}
		}
		return (
			<div>
				<button id="login" onClick={() => loginWithRedirect()}>
                    Log In
                </button>
			</div>
		);
	}

	return <LogoutButton></LogoutButton>

}

export default App;
