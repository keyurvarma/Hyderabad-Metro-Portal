import React from "react";
import "../Homepage/homepage.css";
import "./dashboard.css";
import ModalImage from "react-modal-image";
import { Analytics } from "../Analytics/Analytics";
export default function Dashboard({ history }) {
  const bookTicket = (e) => {
    e.preventDefault();
    history.push("/routes");
  };
  const getBookingHistory = (e) => {
    e.preventDefault();
    history.push("/bookingHistory");
  };
  return (
    <div className="container maint-cnt">
      <div className="header-nav">
        <span className="mytext1"> Hyderabad Metro </span>
      </div>

      <div className=""></div>
      <Analytics />
      <div className="main-container">
        <a href="/#" onClick={(e) => bookTicket(e)} className="mainBtnDash">
          <svg width="277" height="62">
            <defs>
              <linearGradient id="grad1">
                <stop offset="0%" stopColor="#FF8282" />
                <stop offset="100%" stopColor="#E178ED" />
              </linearGradient>
            </defs>
            <rect
              x="5"
              y="5"
              rx="25"
              fill="none"
              stroke="url(#grad1)"
              width="266"
              height="50"
            ></rect>
          </svg>
          <span>Book a ticket!</span>
        </a>
        <a
          href="/#"
          onClick={(e) => getBookingHistory(e)}
          className="mainBtnDash"
        >
          <svg width="277" height="62">
            <defs>
              <linearGradient id="grad1">
                <stop offset="0%" stopColor="#FF8282" />
                <stop offset="100%" stopColor="#E178ED" />
              </linearGradient>
            </defs>
            <rect
              x="5"
              y="5"
              rx="25"
              fill="none"
              stroke="url(#grad1)"
              width="266"
              height="50"
            ></rect>
          </svg>
          <span>Booking History</span>
        </a>
        <div className="mapImg">
          <ModalImage small={"./mapSmall.png"} large={"./map.jpg"} alt="Map" />
        </div>
      </div>
    </div>
  );
}
