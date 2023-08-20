import Footer from "../../components/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

import "./EmailVerification.css";
import { useState } from "react";
import axios from "axios";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const verifyEmail = process.env.REACT_APP_URL + "/verify";
  // const resendEmailUrl = process.env.REACT_APP_URL + "/resendemail";
  const email = ReactSession.get("email");

  const navigate = useNavigate();
  const navigateToTerms = () => {
    navigate("/terms-conditions");
  };

  function verify() {
    if (verificationCode.length < 4 || verificationCode.length > 4) {
      window.alert("Code is 4 numbers");
      return;
    }

    axios
      .post(verifyEmail, {
        email: email,
        verificationCode: verificationCode,
      })
      .then((response) => {
        if (response.data.message == "Email Verified") {
          navigateToTerms();
        }
      })
      .catch((error) => {
        window.alert("Wrong code");
        console.log(error.response.data.message);
      });
  }

  // function resendEmail() {
  //   axios.post(resendEmailUrl, {
  //     email: email
  //   }).then((response) => {
  //     window.alert("Resend verification email, check you spam folder");
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  return (
    <div className="wrapper">
      <div className="verification">
        <div className="verification__header">
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />

          <img src="assets/logo.png" alt="logo" />
        </div>

        <div className="verification__content">
          <p className="verification__topText">
            You need to verify your email address to activate your account
          </p>

          <div className="verification__container">
            <h1 className="verification__heading">Verify your Email</h1>

            <p className="verification__para">
              An email with instructions to verify your email address has been
              sent to you. Haven't recieved a verification code in your email?
              Click the button to re-send or contact our support.
            </p>

            <input
              type="text"
              className="verification__input"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <div className="verification__actions">
              <button className="bgwhite-border-btn">Contact Support</button>

              {/* <button onClick={resendEmail} className="bgwhite-border-btn">Resend</button> */}

              <button onClick={verify} className="aqua-btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmailVerification;
