import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { useAuth0 } from '@auth0/auth0-react';

const Sidebar = ({ sidebarOpen, closeSidebar, logOut, setPageToFlows, setPageToDashboard, setPageToRFDDiary, page, openSidebar}) => {
  return (
    <div id="sidebar">
      <div className={sidebarOpen ? "sidebar__title" : "sidebar__text"}>
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Codersbite</h1>
        </div>
        <i
          onClick={closeSidebar}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      <div className="sidebar__menu">
      {
          (!sidebarOpen) ? 
          <div className="sidebar__link" onClick={openSidebar}>
          <i
          className="fa fa-bars"
          aria-hidden="true"
        ></i>
        </div>
        : ""
        }
        <div className={page == "Dashboard" ? "sidebar__link active_menu_link" : "sidebar__link"} onClick={() => setPageToDashboard()}>
          <i className="fa fa-home"></i>
          <a className={sidebarOpen ? "" : "sidebar__text"} href="#">Dashboard</a>
        </div>
        <div className={page == "Flows" ? "sidebar__link active_menu_link" : "sidebar__link"} onClick={() => setPageToFlows()}>
          <i className="fa fa-file"></i>
          <a className={sidebarOpen ? "" : "sidebar__text"} href="#">Flows</a>
        </div>
        <div className={page == "RFD Diary" ? "sidebar__link active_menu_link" : "sidebar__link"} onClick={() => setPageToRFDDiary()}>
          <i className="fa fa-folder-open"></i>
          <a className={sidebarOpen ? "" : "sidebar__text"} href="#">RFD Diary</a>
        </div>
        <div className="sidebar__logout" onClick={() => logOut()}>
          <i className="fa fa-power-off"></i>
          <a className={sidebarOpen ? "" : "sidebar__text"} href="#">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
