import React from "react";

import Footer from "../../components/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import "./TermsConditions.css";

import axios from "axios";

import { ReactSession } from 'react-client-session';


const TermsConditions = () => {
  const navigate = useNavigate();

  const navigateToPin = () => {
    navigate('/master-pin')
  }

  const acceptTermsUrl = process.env.REACT_APP_URL + '/acceptterms'

  function acceptTerms() {
    axios.post(acceptTermsUrl, {
      email: ReactSession.get("email")
    }, {
      withCredentials: true
    }).then((response) => {
      // if(response.status == '200') {
      //   navigateToPin()
      // }
    })
  }

  return (
    <div className="wrapper">
      <div className="terms">
        <div className="terms__header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />

          <img src="assets/logo.png" alt="logo" />
        </div>

        <div className="terms__container">
          <p className="terms__para">
            Thank you for using EZ Wallet. To proceed, please read and accept
            our latest <span>terms and conditions.</span>
          </p>

          <div className="terms__actions">
            <button className="bgwhite-border-btn">Decline</button>

            <button onClick={acceptTerms} className="aqua-btn">
              Accept
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
