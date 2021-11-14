import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { useAuth0 } from '@auth0/auth0-react';

const PAGES_ICON = {
  'Dashboard' : 'fa-home',
  'Flows' : 'fa-file', 
  'File System' : 'fa-folder-open'
}

const Sidebar = ({ sidebarOpen, closeSidebar, logOut, setPage, page, openSidebar}) => {
  return (
    <div id="sidebar">
      <div className={sidebarOpen ? "sidebar__title" : "sidebar__ceasetoexist"}>
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
          <div className="sidebar__link" style={!sidebarOpen ? {display:'flex', justifyContent:'center'} : {}}  onClick={openSidebar}>
          <i
          className="fa fa-bars"
          aria-hidden="true"
        ></i>
        </div>
        : ""
        }
        {
          Object.keys(PAGES_ICON).map((val, ind) => {
            return <div className={page === val ? "sidebar__link active_menu_link" : "sidebar__link"} style={!sidebarOpen ? {display:'flex', justifyContent:'center'} : {}} onClick={() => setPage(val)}>
              <i className={"fa " + Object.values(PAGES_ICON)[ind]} style={sidebarOpen ? {marginRight:'10px'} : {}}></i>
              <a className={sidebarOpen ? "" : "sidebar__ceasetoexist"} href="#">{val}</a>
            </div>
          })
        }
        {/* <div className={page == "Dashboard" ? "sidebar__link active_menu_link" : "sidebar__link"} style={!sidebarOpen ? {display:'flex', justifyContent:'center'} : {}} onClick={() => setPageToDashboard()}>
          <i className="fa fa-home" style={sidebarOpen ? {marginRight:'10px'} : {}}></i>
          <a className={sidebarOpen ? "" : "sidebar__ceasetoexist"} href="#">Dashboard</a>
        </div>
        <div className={page == "Flows" ? "sidebar__link active_menu_link" : "sidebar__link"} onClick={() => setPageToFlows()}>
          <i className="fa fa-file"></i>
          <a className={sidebarOpen ? "" : "sidebar__ceasetoexist"} href="#">Flows</a>
        </div>
        <div className={page == "RFD Diary" ? "sidebar__link active_menu_link" : "sidebar__link"} onClick={() => setPageToRFDDiary()}>
          <i className="fa fa-folder-open"></i>
          <a className={sidebarOpen ? "" : "sidebar__ceasetoexist"} href="#">RFD Diary</a>
        </div> */}
        <div className="sidebar__logout" style={!sidebarOpen ? {display:'flex', justifyContent:'center'} : {}} onClick={() => logOut()}>
          <i className="fa fa-power-off" style={sidebarOpen ? {marginRight:'10px'} : {}}></i>
          <a className={sidebarOpen ? "" : "sidebar__ceasetoexist"} href="#">Log out</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
