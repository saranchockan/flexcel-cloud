import React, { Component } from 'react';
import './styling/App.css';
import { useAuth0 } from '@auth0/auth0-react';

import Main from "./components/main/Main";
import Flow from './components/screens/Flow';
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import RFDDiary from './components/screens/RFDDiary';

import PropTypes from 'prop-types'
import DropdownBar from './components/parts/Flow/DropdownBar';

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

function App(props) {
	return <MainPage auth={useAuth0()}></MainPage>
}

export default App

class MainPage extends Component {
	static propTypes = {
		auth: PropTypes.object
	}

	constructor(props){
		super(props)

		this.state = {
			sidebarOpen: true,
			page: "Dashboard",
			dropDownInfo: {
				show: false,
				top: 0,
				left: 0,
				attributes: {}
			}
		}

		this.setSidebarOpen = this.setSidebarOpen.bind(this)
		this.setPage = this.setPage.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	setSidebarOpen(p) {
		this.setState({ sidebarOpen: p })
	}

	setPage(p) {
		this.setState({ page: p })
	}

	handleClick(e){
		console.log(e.target.closest('navbar__left'))
		if(!e.target.closest('a') && this.state.dropDownInfo.show){
			this.setState({dropDownInfo: {
				...this.state.dropDownInfo,
				show: false
			}})
		}
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

		//handle logging out if they click the log out button
		if (isLoading) {
			return <div>Loading...</div>;
		}
		if (error) {
			return <div>{error.message}</div>;
		}

		if (isAuthenticated) {
			console.log(this.state.dropDownInfo)
			return <div className={"flex " + (this.state.sidebarOpen ? "main_screen" : "main_min_screen")} style={{ gridTemplateRows: (this.state.page == 'Flows' ? '0.1fr 3fr' : '0fr 3fr') }}>
				{
					<DropdownBar handleClick={this.handleClick} dropDownInfo={this.state.dropDownInfo}></DropdownBar>
				}
				{this.state.page == 'Flows' ? <Navbar show={this.state.dropDownInfo.show} setDropdownInfo={(n) => this.setState({dropDownInfo: {...this.state.dropDownInfo, ...n}})}/> : <div></div>}
				<Sidebar sidebarOpen={this.state.sidebarOpen} closeSidebar={() => {this.setSidebarOpen(false)}} openSidebar={() => {this.setSidebarOpen(true)}} logOut={logout} setPage={this.setPage} page={this.state.page} />
				{getView(this.state.page, user)}
			</div>

		} else {
			loginWithRedirect();
		}
	}
}