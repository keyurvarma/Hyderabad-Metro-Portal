import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage/Homepage";
import RouteSelection from "./components/RouteSelection/RouteSelection";
import LogOrsign from "./components/Login-Signup/LogOrsign";
import Signup from "./components/Login-Signup/Signup";
import Profile from "./components/Profile/Profile";
import TicketPage from "./components/TicketPage/TicketPage";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import BookingHistory from "./components/BookingHistory/bookingHistory";
import PayAllDues from "./components/PaymentTab/PayAllDues";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Homepage {...props} />} />
          <Route path="/login" render={(props) => <LogOrsign {...props} />} />
          <Route path="/register" render={(props) => <Signup {...props} />} />
          <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
          <Route
            path="/routes"
            exact
            render={(props) => <RouteSelection {...props} />}
          />
          <Route
            path="/profile"
            exact
            render={(props) => <Profile {...props} />}
          />
          <Route
            path="/getTicket"
            exact
            render={(props) => <TicketPage {...props} />}
          />
          <Route
            path="/bookingHistory"
            exact
            render={(props) => <BookingHistory {...props} />}
          />
          <Route
            path="/payAllDues"
            exact
            render={(props) => <PayAllDues {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
