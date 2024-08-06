import React, { useState } from "react";
import "./Routeselector.css";
import { getPrice } from "../../helper";
export default function Routeselector() {
  const [startStation, setStartStation] = useState("");
  const [destination, setDestination] = useState("");
  const handleToStation = (e) => {
    e.preventDefault();
    setDestination(e.target.value);
  };

  const handleFromStation = (e) => {
    e.preventDefault();
    setStartStation(e.target.value);
    // console.log(startStation)
  };

  const getRoutes = (e) => {
    e.preventDefault();
    localStorage.setItem("destination", destination);
    localStorage.setItem("startStation", startStation);
    localStorage.setItem("price", getPrice(startStation, destination));
  };

  return (
    <div className="rdc">
      <div className="form-group inline"></div>
      <div className="main-container">
        <form className="form-inline" onSubmit={(e) => getRoutes(e)}>
          <select
            name="ad_account_selected"
            data-style="btn-new"
            class="selectpicker"
            onChange={(e) => {
              handleFromStation(e);
            }}
          >
            <option>FROM</option>
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
          <select
            name="ad_account_selected"
            data-style="btn-new"
            class="selectpicker"
            onChange={(e) => {
              handleToStation(e);
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
          <input type="submit" className=" btn btn-primary btn-md getRoute" />
        </form>
      </div>
    </div>
  );
}
