import React from "react";
import "./TicketPage.css";
import { stations, changeStation, getPrice } from "../../helper";

export default function TicketPage({ history }) {
  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("reservedSeats");
    localStorage.removeItem("nameData");
    localStorage.clear();
    history.push("/");
  };
  const handleBookAgainIcon = (e) => {
    e.preventDefault();
    history.push("/routes");
  };
  const getLocationData = () => {
    let from = localStorage.getItem("startStation");
    let to = localStorage.getItem("destination");
    return (
      <div>
        <p style={{ color: stations[from.trim()] }}>From: {from}</p>
        <p style={{ color: stations[to.trim()] }}>To: {to}</p>
      </div>
    );
  };
  const getChangeStation = () => {
    let from = localStorage.getItem("startStation");
    let to = localStorage.getItem("destination");

    let change = changeStation(from, to);
    if (change == "") return <div></div>;
    else return <div>Change at: {change}</div>;
  };
  const getTicketPrice = () => {
    return (
      <div>
        Price: {"₹"}
        {localStorage.getItem("price")}
      </div>
    );
  };
  const getIdNumber = () => {
    return <p className="idData">{localStorage.getItem("transactionId")}</p>;
  };
  return (
    <div className="container">
      <div>
        <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
          <a href="/dashboard" className="navbar-brand Company-Log">
            HYD METRO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-3"
            aria-controls="navbarSupportedContent-3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-3"
          >
            <ul className="navbar-nav ml-auto nav-flex-icons ic">
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleBookAgainIcon(e)}
                >
                  Book Again
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleSignOut(e)}
                >
                  Sign-Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="tpMain">
        <article className="ticket">
          <header className="ticket__wrapper">
            <div className="ticket__header">1 🎟 HYD METRO</div>
          </header>
          <div className="ticket__divider">
            <div className="ticket__notch"></div>
            <div className="ticket__notch ticket__notch--right"></div>
          </div>
          <div className="ticket__body">
            <section className="ticket__section">
              {getLocationData()}
              {getChangeStation()}
            </section>

            <section className="ticket__section">{getTicketPrice()}</section>
          </div>
          <footer className="ticket__footer">
            <p>Transaction-ID</p>
            {getIdNumber()}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="ticket-qr" src="./QR.png" />
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
