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
            <p>Welcome to your admin dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="main__cards">
          <div className="card">
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

          <div className="card">
            <div className="card_inner">
              <p className="font-bold card__title__text">Bids</p>
              <p className="font-bold card__info__text">9999</p>
            </div>
            <div className="change">
              <i class="fa fa-arrow-down fa-2x" style={{color:'rgb(240, 56, 56)'}} aria-hidden="true"></i> {/* <!-- later, add if statement on whether to use up or down arrow --> */}
              <p className="change__text">99.9%</p>
            </div>
          </div>

          <div className="card">
            <div className="card_inner">
              <p className="font-bold card__title__text">Bid Rounds</p>
              <p className="font-bold card__info__text">999</p>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts"> 
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Income</h1>
                <p>$75,300</p>
              </div>

              <div className="card2">
                <h1>Sales</h1>
                <p>$124,200</p>
              </div>

              <div className="card3">
                <h1>Users</h1>
                <p>3900</p>
              </div>

              <div className="card4">
                <h1>Orders</h1>
                <p>1881</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;
