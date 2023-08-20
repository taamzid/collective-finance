import React from "react";

import Footer from "../../components/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

import "./MasterPin.css";
import axios from "axios";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import SyncLoader from "react-spinners/SyncLoader";

const MasterPin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const { promiseInProgress } = usePromiseTracker();

  const navigateToDahboard = () => {
    // 👇️ navigate to /contacts
    navigate("/inventory");
  };

  const createWalletUrl = process.env.REACT_APP_URL + "/createwallet";
  const testa = process.env.REACT_APP_URL + "/test";

  function createWallet() {
    if (pin.length < 4 || pin.length > 6) {
      window.alert("Pin must be between 4 and 6 numbers");
      return;
    }

    // if (isNaN(pin)) {
    //   window.alert("Pin must contain only numbers");
    //   return;
    // }

    if (pin != confirmPin) {
      window.alert("Pins do not match");
      return;
    }

    // trackPromise(
    //   axios
    //     .post(createWalletUrl, {
    //       pin: pin,
    //       email: ReactSession.get("email"),
    //     }, {
    //       withCredentials: true
    //     })
    //     .then((response) => {
    //       if (response.status == "200") {
    //         navigateToDahboard();
    //       }
    //       console.log(response.data.message);
    //     })
    //     .catch((error) => {
    //       if (error.response.data.message == "User already has wallet") {
    //         navigateToDahboard();
    //       }
    //     })
    // );
  }

  return (
    <div className="wrapper">
      <div className="masterpin">
        <div className="masterpin__header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />

          <img src="assets/logo.png" alt="logo" />
        </div>

        <div className="masterpin__content">
          <h1 className="masterpin__heading">Set Master Pin</h1>

          <p className="masterpin__para">
            Your Master Pin is a number between 4 and 6 digits, easy to
            remember, but hard to crack. This pin will act as your master key,
            you can compare it to the pin of your Debit Card.
          </p>

          <div className="masterpin__input">
            <span>Enter Master Pin</span>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <div className="masterpin__input">
            <span>Confirm Master Pin</span>
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
            />
          </div>
          
          {
            (promiseInProgress === true) ?
            <div className="loader"><SyncLoader color="#36d7b7" /></div> :
            <button onClick={createWallet} className="aqua-btn">
            Set
            </button>
          }
          

        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MasterPin;
