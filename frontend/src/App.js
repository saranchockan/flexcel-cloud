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
	const {
		isLoading,
		isAuthenticated,
		error,
		user,
		loginWithRedirect,
		logout,
	  } = useAuth0();
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
	if (isLoading) {
		return <div>Loading...</div>;
	  }
	  if (error) {
		return <div>{error.message}</div>;
	  }

	  if (isAuthenticated) {
	//handle what page they're on after they logged in
	switch(page) {
		default: 
			return (
				<div className="flex main_screen">
					<Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} logOut={logOut} setPageToFlows = {setPageToFlows}/>
					<Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logOut={logOut} setPageToFlows = {setPageToFlows}/>
					<Main name={user.name} />
				</div>
			);
		case "Flow":
			return (
				<div className="">
					<Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} logOut={logOut} />
					<Flow />
					<Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logOut={logOut} />
				</div>
			);
		//case "RFD Diary":
	}
	} else {
		loginWithRedirect();
	}
}
export default App;
