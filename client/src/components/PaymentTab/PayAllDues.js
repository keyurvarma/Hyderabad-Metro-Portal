import React from "react";
import Card from "react-credit-cards";
import "./PaymentTab.css";
import jwt_decode from "jwt-decode";
import { stations, changeStation, getPrice } from "../../helper";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";
import Axios from "axios";
import { v4 } from "uuid";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: "",
    token: "",
  };

  componentDidMount() {
    const tok = sessionStorage.getItem("authToken");
    const decoded = jwt_decode(tok);
    const getUnpaidTickets = async () => {
      let tickets = await Axios.post("api/bookingHistory", {
        email: localStorage.getItem("email"),
        unpaidOnly: true,
      });
      this.setState({
        tickets: tickets.data.tickets,
      });
    };
    getUnpaidTickets();
    this.setState({ token: decoded.user });
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
    window.location.href = "/dashboard";
    (async () => {
      this.state.tickets.forEach(async (ticket) => {
        await Axios.post("api/bookingHistory/payAllDues", {
          ticketId: ticket._id,
          paid: true,
        });
      });
    })();
  };

  getSumTotal = () => {
    if (!this.state.tickets) return;

    let sum = 0;
    this.state.tickets.forEach((ticket) => {
      sum += Number(ticket.price);
    });

    return sum;
  };

  render() {
    const {
      name,
      number,
      expiry,
      cvc,
      focused,
      issuer,
      tickets,
      formData,
      token,
    } = this.state;

    return (
      <div className="container">
        <div>
          <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
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
            <div>
              <div className="paym">
                <div className="row">
                  <div className="columnTwo">
                    <h3> HYD METRO </h3>{" "}
                    <div>
                      <p> PAYMENT DETAILS </p>{" "}
                      <div className="row">
                        <div className="col-6 pt">
                          <hr className="hr3" />
                          {this.state.tickets?.map((ticket) => {
                            return (
                              <>
                                <p className="usrName">From</p>
                                <p className="usrName">To</p>
                                <p className="usrName">Price</p>
                                <hr className="hr3" />
                              </>
                            );
                          })}
                          <p className="hdng"> Total price </p>{" "}
                        </div>{" "}
                        <div className="col-6">
                          <hr className="hr3" />
                          {this.state.tickets?.map((ticket) => {
                            return (
                              <>
                                <p className="usrName">{ticket.startStation}</p>
                                <p className="usrName">{ticket.destination}</p>
                                <p className="usrName">
                                  {"₹"}
                                  {ticket.price}
                                </p>
                                <hr className="hr3" />
                              </>
                            );
                          })}

                          {"₹"}
                          {this.getSumTotal()}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div key="Payment">
                    <div className="App-payment cl-1">
                      <p className="pPayment"> Enter Credit card details </p>{" "}
                      <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                      />{" "}
                      <form
                        className="credit-form"
                        ref={(c) => (this.form = c)}
                        onSubmit={this.handleSubmit}
                      >
                        <div className="form-group">
                          <input
                            type="tel"
                            name="number"
                            className="frm-ctrl"
                            placeholder="Card Number"
                            pattern="[\d| ]{16,22}"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />{" "}
                        </div>{" "}
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="frm-ctrl"
                            placeholder="Name"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />{" "}
                        </div>{" "}
                        <div className="form-group">
                          <input
                            type="tel"
                            name="expiry"
                            className="frm-ctrl"
                            placeholder="Valid Thru"
                            pattern="\d\d/\d\d"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />{" "}
                        </div>{" "}
                        <div className="form-group">
                          <input
                            type="tel"
                            name="cvc"
                            className="frm-ctrl cvc"
                            placeholder="CVC"
                            pattern="\d{3,4}"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />{" "}
                        </div>{" "}
                        <input type="hidden" name="issuer" value={issuer} />{" "}
                        <div className="">
                          <button
                            onClick={(e) => this.handleSubmit}
                            className="btn btn-light btCustom"
                          >
                            PAY{" "}
                          </button>{" "}
                        </div>{" "}
                      </form>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
