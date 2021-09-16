import React, { useState } from 'react';
import './styling/App.css';
import { useAuth0 } from '@auth0/auth0-react';

import Main from "./components/main/Main";
import Flow from './components/screens/Flow';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import RFDDiary from './components/screens/RFDDiary';

function getView(page, user) {
	//handle what page they're on after they logged in
	switch (page) {
		default:  //dashboard
			return <Main name={user.name} />
		case "Flows":
			return <Flow />
		case "RFD Diary":
			return <RFDDiary />
	}
}

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
		getAccessTokenSilently
	} = useAuth0();
	const logOut = () => {
		lg(true);
	};

	//what page we're on
	const [page, setPage] = useState("Dashboard");
	const setPageToDashboard = () => {
		setPage("Dashboard");
	};
	const setPageToFlows = () => {
		setPage("Flows");
	};
	const setPageToRFDDiary = () => {
		setPage("RFD Diary");
	};

	//handle logging out if they click the log out button
	if (loggedOut) {
		logout();
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>{error.message}</div>;
	}

	if (isAuthenticated) {
		getAccessTokenSilently().then(console.log)
		return <div className="flex main_screen">
			<Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} logOut={logOut} />
			<Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} logOut={logOut} setPageToFlows={setPageToFlows} setPageToDashboard={setPageToDashboard} setPageToRFDDiary={setPageToRFDDiary} page={page} />
			{getView(page, user)}
		</div>

	} else {
		loginWithRedirect();
	}
}
export default App;
