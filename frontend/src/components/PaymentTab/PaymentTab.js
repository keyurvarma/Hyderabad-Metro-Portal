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
  };

  moveToTicketPage = (e, paid) => {
    e.preventDefault();
    localStorage.setItem("paymentData", JSON.stringify(this.state.token));
    const price = getPrice(
      localStorage.getItem("startStation"),
      localStorage.getItem("destination")
    );
    const transactionId = v4();
    localStorage.setItem("price", price);
    localStorage.setItem("transactionId", transactionId);
    window.location.href = "/getTicket";
    Axios.post(
      "api/routes/",
      {
        transactionId: transactionId,
        email: localStorage.getItem("email"),
        startStation: localStorage.getItem("startStation"),
        destination: localStorage.getItem("destination"),
        price: price,
        paid: paid,
      },
      (err, data) => {
        if (err) console.log(err);
      }
    );
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData, token } =
      this.state;

    return (
      <div className="paym">
        <div className="row">
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
                    onClick={(e) => this.moveToTicketPage(e, true)}
                    className="btn btn-light btCustom"
                  >
                    PAY{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
          <div className="columnTwo">
            <h3> HYD METRO </h3>{" "}
            <div>
              <p> BOOKING DETAILS </p>{" "}
              <div className="row">
                <div className="col-6 pt">
                  <hr className="hr3" />
                  <p className="hdng"> From </p>
                  <p className="hdng"> To </p> <hr className="hr3" />
                  <p className="hdng"> Ticket price </p>{" "}
                </div>{" "}
                <div className="col-6">
                  <hr className="hr3" />
                  <p className="usrName">
                    {" "}
                    {localStorage.getItem("startStation")}{" "}
                  </p>{" "}
                  <p className="usrName">
                    {" "}
                    {localStorage.getItem("destination")}{" "}
                  </p>{" "}
                  <hr className="hr3" />
                  {localStorage.getItem("price")}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <button
              className="btn border"
              onClick={(e) => this.moveToTicketPage(e, false)}
            >
              Pay Later
            </button>
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}
