import React, { useState } from 'react';
import './styling/App.css';
/*import Flow from './components/screens/Flow';

For some reason, when I insert this line or if I change lines 20-21 in index.html, the formatting of the Dashboard screws up.

*/
import Login from './components/screens/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './components/parts/Buttons/LogoutButton';
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
	
	const [sidebarOpen, setsidebarOpen] = useState(false);
	const [loggedOut, lg] = useState(false);
	const {logout} = useAuth0();
	const openSidebar = () => {
		setsidebarOpen(true);
	};
	const closeSidebar = () => {
		setsidebarOpen(false);
	};
	const logOut = () => {
		lg(true);
	};
	const {user, isAuthenticated} = useAuth0();
    const { loginWithRedirect } = useAuth0();

	if(loggedOut) {
		logout();
	}

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
	return (
		<div className="container">
			<Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} logOut={logOut} />
			<Main />
			<Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logOut={logOut} />
		</div>
	);
}
export default App;
