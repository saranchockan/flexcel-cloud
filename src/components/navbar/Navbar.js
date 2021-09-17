import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

/*
Old keybinds used by the old FLexcel software will be supported with ticking an option. However, they are not very user-friendly.
The navigation bar on the Flows UI will allow the user to use their mouse while adapting to the keybinds and getting accustomed to using the software.
*/

const Navbar = ({ page }) => {
    return (
      <nav className="navbar">
        <div className="navbar__left">
          <a href="#">Flow</a>
          <a href="#">Tabs</a>
          <a href="#">Rows</a>
          <a href="#">Autocomplete</a>
        </div>
        <div className="navbar__right">
          <a href="#">
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </a>
          <a href="#!">
            <img width="30" src={avatar} alt="avatar" />
          </a>
        </div>
      </nav>
    );
};

export default Navbar;
