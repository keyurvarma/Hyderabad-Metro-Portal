import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./bookingHistory.css";
import moment from "moment";
import { getPrice } from "../../helper";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";

const getBookingHistory = async () => {
  let tickets = await Axios.post("/api/bookingHistory", {
    email: localStorage.getItem("email"),
  });
  return tickets.data.tickets;
};
export default function BookingHistory({ history }) {
  const [tickets, setTickets] = useState([]);
  const [selectDestination, setSelectDestination] = useState(false);
  const [toStation, setToStation] = useState();
  useEffect(() => {
    const getTickets = async () => {
      const tickets = await getBookingHistory();
      setTickets(tickets);
    };
    getTickets();
  }, [toStation]);

  useEffect(() => {
    console.log("hi");
  }, [toStation]);

  const getExpired = (ticket) => {
    const duration = moment.duration(moment().diff(ticket.bookedAt));
    return duration.asHours() > 12;
  };

  const changeDestination = async (ticketId) => {
    const price = getPrice(localStorage.getItem("startStation"), toStation);
    await Axios.post("/api/bookingHistory/changeDestination", {
      ticketId: ticketId,
      destination: toStation,
      price: price,
    });
  };

  return (
    <div>
      <Link to={"/payAllDues"}>
        <div className="btn btn-primary my-5 mx-5">Pay Monthy Dues</div>
      </Link>
      {tickets &&
        tickets.length > 0 &&
        tickets.map((ticket, index) => {
          let expiredStatus = getExpired(ticket);
          return (
            <div key={index} className="ticketBox card">
              {ticket.startStation} {"   --   "} {ticket.destination}
              <div>
                {"₹"}
                {ticket.price}
              </div>
              {ticket.paid == "true" ? (
                <div style={{ color: "green" }}>Paid</div>
              ) : (
                <div style={{ color: "yellow" }}>Pending</div>
              )}
              {expiredStatus ? (
                <div>Expired</div>
              ) : (
                <div
                  className="changeDest-btn"
                  onClick={(e) => setSelectDestination(true)}
                >
                  {!selectDestination && "Change destination"}
                </div>
              )}
              {selectDestination && (
                <div className="selectDest-form">
                  <select
                    name="ad_account_selected"
                    data-style="btn-new"
                    class="selectpicker"
                    onChange={(e) => {
                      setToStation(e.target.value);
                    }}
                  >
                    <option>TO</option>
                    <option>Miyapur </option>
                    <option>JNTU College </option>
                    <option>KPHB Colony</option>
                    <option>Kukatpally </option>
                    <option>Dr.B.R. Ambedkar Balanagar </option>
                    <option>Moosapet</option>
                    <option>Bharat Nagar </option>
                    <option>Erragadda </option>
                    <option>ESI Hospital</option>
                    <option> S R Nagar </option>
                    <option>Ameerpet </option>
                    <option> Punjagutta</option>
                    <option> Irrum Manzil </option>
                    <option> Khairatabad </option>
                    <option> Lakdikapul</option>
                    <option> Assembly </option>
                    <option>Nampally </option>
                    <option> Gandhi Bhavan</option>
                    <option> Osmania Medical College </option>
                    <option> MG Bus station </option>
                    <option> Malakpet</option>
                    <option> New Market </option>
                    <option> Musarambagh </option>
                    <option>Dilsukhnagar</option>
                    <option> Chaitanyapuri Victoria Memorial </option>
                    <option> L B Nagar</option>
                    <option> JBS Parade Ground </option>
                    <option> Secunderabad West </option>
                    <option> Gandhi Hospital</option>
                    <option> Musheerabad </option>
                    <option> RTC X Roads </option>
                    <option> Chikkadpally</option>
                    <option> Narayanguda </option>
                    <option> Sultan Bazar</option>
                    <option> Nagole </option>
                    <option>Uppal </option>
                    <option>Stadium</option>
                    <option>NGRI</option>
                    <option>Habsiguda </option>
                    <option> Tarnaka</option>
                    <option> Mettuguda </option>
                    <option> Secunderabad </option>
                    <option>Paradise </option>
                    <option>RasoolPura </option>
                    <option> Prakash Nagar</option>
                    <option> Begumpet </option>
                    <option> Madhura Nagar</option>
                    <option>YusufGuda </option>
                    <option>Road No 5 Jubilee Hills </option>
                    <option> Jubilee Hills Check Post</option>
                    <option> Pedamma Temple </option>
                    <option> Madhapur </option>
                    <option> Durgam Chervu</option>
                    <option> HITEC Station </option>
                    <option> Raidurg </option>
                  </select>
                  <button
                    onClick={(e) => {
                      changeDestination(ticket._id);
                      setSelectDestination(false);
                    }}
                    className=" btn btn-primary btn-md getRoute"
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              )}
              <ModalImage small={"./QRSmall.png"} large={"./QR.png"} alt="QR" />
            </div>
          );
        })}
    </div>
  );
}
