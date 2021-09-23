import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { useAuth0 } from "@auth0/auth0-react";

const Main = (props) => {
  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello {props.name}</h1>
            <p>Welcome to your Flexcel dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <p className="font-bold section_title_ao">Analytics Overview</p>
        <div className="main__cards">
          <div className="analytics_card_leftmost">
            {/* <!-- add icon here if applicable --> */}
            <div className="card_inner">
              <p className="font-bold card__title__text">Record</p>
              <p className="font-bold card__info__text">999-999</p>
            </div>
            <div className="change">
              <i class="fa fa-arrow-up fa-2x" style={{color:'rgb(56, 240, 56)'}} aria-hidden="true"></i> {/* <!-- later, add if statement on whether to use up or down arrow --> */}
              <p className="change__text">99.9%</p>
            </div>
          </div>

          <div className="analytics_card">
            <div className="card_inner">
              <p className="font-bold card__title__text">Bids</p>
              <p className="font-bold card__info__text">9999</p>
            </div>
            <div className="change">
              <i class="fa fa-arrow-down fa-2x" style={{color:'rgb(240, 56, 56)'}} aria-hidden="true"></i> {/* <!-- later, add if statement on whether to use up or down arrow --> */}
              <p className="change__text">99.9%</p>
            </div>
          </div>

          <div className="analytics_card">
            <div className="card_inner">
              <p className="font-bold card__title__text">Bid Rounds</p>
              <p className="font-bold card__info__text">999</p>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- upcoming tournaments starts here --> */}
        <p className="font-bold section_title_ut">Upcoming Tournaments</p>
        <div className="upcoming_tournaments">
          <table className="upcoming_tournaments_table">
            <tr className="upcoming_tournaments_table">
              <th className="upcoming_tournaments_table_title_name">Name</th>
              <th className="upcoming_tournaments_table_title_date">Date</th>
            </tr>
            <tr className="upcoming_tournaments_table">
              <th className="upcoming_tournaments_name">Placeholder Tournament Name</th>
              <th className="upcoming_tournaments_date">09/22/2021</th>
            </tr>
            <tr className="upcoming_tournaments_table">
              <th className="upcoming_tournaments_name">Placeholder Tournament Name</th>
              <th className="upcoming_tournaments_date">09/22/2021</th>
            </tr>
            <tr className="upcoming_tournaments_table">
              <th className="upcoming_tournaments_name">Placeholder Tournament Name</th>
              <th className="upcoming_tournaments_date">09/22/2021</th>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Main;
