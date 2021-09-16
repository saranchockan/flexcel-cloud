import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { useAuth0 } from '@auth0/auth0-react';

const Sidebar = ({ sidebarOpen, closeSidebar, logOut, setPageToFlows, setPageToDashboard, setPageToRFDDiary, page}) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Codersbite</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className={page == "Dashboard" ? "sidebar__link active_menu_link" : "sidebar__link"}>
          <i className="fa fa-home"></i>
          <a href="#" onClick={() => setPageToDashboard()}>Dashboard</a>
        </div>
        <div className={page == "Flows" ? "sidebar__link active_menu_link" : "sidebar__link"}>
          <i className="fa fa-file"></i>
          <a href="#" onClick={() => setPageToFlows()}>Flows</a>
        </div>
        <div className={page == "RFD Diary" ? "sidebar__link active_menu_link" : "sidebar__link"}>
          <i className="fa fa-folder-open"></i>
          <a href="#" onClick={() => setPageToRFDDiary()}>RFD Diary</a>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#" onClick={() => logOut()}>Log out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
