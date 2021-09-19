import React, { Component } from 'react';
import './styling/App.css';
import { useAuth0 } from '@auth0/auth0-react';

import Main from "./components/main/Main";
import Flow from './components/screens/Flow';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import RFDDiary from './components/screens/RFDDiary';

import PropTypes from 'prop-types'

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

function App(){
	return <MainPage auth={useAuth0()}></MainPage>
}

export default App

class MainPage extends Component {
	static propTypes = {
		prop: PropTypes
	}

	state = {
		sidebarOpen: true,
		page: "Dashboard"
	}

	setSidebarOpen(p){
		this.setState({sidebarOpen: p})
	}

	setPage(p){
		this.setState({page: p})
	}

	render() {
		const {
			isLoading,
			isAuthenticated,
			error,
			user,
			loginWithRedirect,
			logout,
			getAccessTokenSilently
		} = this.props.auth

		const page = (p) => {
			this.setPage(p)
		}

		const closeSidebar = () => {
			this.setSidebarOpen(false)
		}

		const openSidebar = () => {
			this.setSidebarOpen(true)
		}
	
		//handle logging out if they click the log out button
		if (isLoading) {
			return <div>Loading...</div>;
		}
		if (error) {
			return <div>{error.message}</div>;
		}
	
		if (isAuthenticated) {
			console.log(this.state.page)
			return <div className={"flex " + (this.state.sidebarOpen ? "main_screen" : "main_min_screen")} style={{gridTemplateRows: (this.state.page == 'Flows' ? '0.2fr 3fr' : '0fr 3fr')}}>
						{this.state.page == 'Flows' ? <Navbar sidebarOpen={this.state.sidebarOpen} logOut={logout} /> : <div></div>}
						<Sidebar sidebarOpen={this.state.sidebarOpen} closeSidebar={closeSidebar} openSidebar={openSidebar} logOut={logout} setPage={page} page={this.state.page} />
						{getView(this.state.page, user)}
					</div>
	
		} else {
			loginWithRedirect();
		}
	}
}