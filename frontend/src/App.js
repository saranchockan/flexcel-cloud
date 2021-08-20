import React, { useState } from 'react';
import './styling/App.css';
import Flow from './components/screens/Flow';
//For some reason, when I insert this line or if I change lines 20-21 in index.html, the formatting of the Dashboard screws up.

import { useAuth0 } from '@auth0/auth0-react';
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
	
	//sidebar hooks
	const [sidebarOpen, setsidebarOpen] = useState(false);
	const [loggedOut, lg] = useState(false);
	const openSidebar = () => {
		setsidebarOpen(true);
	};
	const closeSidebar = () => {
		setsidebarOpen(false);
	};
	//auth0 hooks
	const {logout} = useAuth0();
	const {user, isAuthenticated} = useAuth0();
    const { loginWithRedirect } = useAuth0();
	const logOut = () => {
		lg(true);
	};

	//what page we're on
	const [page, setPage] = useState("Home");
	const setPageToFlows = () => {
		setPage("Flow");
	};

	//handle logging out if they click the log out button
	if(loggedOut) {
		logout();
	}

	//bring them to auth page if they're not logged in
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

	//handle what page they're on after they logged in
	switch(page) {
		default: 
			return (
				<div className="container">
					<Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} logOut={logOut} setPageToFlows = {setPageToFlows}/>
					<Main />
					<Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logOut={logOut} setPageToFlows = {setPageToFlows}/>
				</div>
			);
		case "Flow":
			return (
				<div className="container">
					<Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} logOut={logOut} />
					<Main />
					<Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logOut={logOut} />
				</div>
			);
		//case "RFD Diary":
	}
	
}
export default App;
