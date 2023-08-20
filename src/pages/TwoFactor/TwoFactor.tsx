import "./TwoFactor.css";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useState } from "react";

const TwoFactor = () => {
  const getQr = process.env.REACT_APP_URL + "/mfa_qr_code";
  const verifyOtp = process.env.REACT_APP_URL + "/verify_otp";
  const turnOffOtp = process.env.REACT_APP_URL + "/disable_otp";
  const email = ReactSession.get("email");
  const [qrImage, setQrImage] = useState("");
  const [otp, setOtp] = useState("");
  const [verCode, setVerCode] = useState("");
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [unableToScan, setUnableToScan] = useState(false);

  axios
    .post(getQr, { email: email })
    .then((response) => {
      setQrImage(response.data.message);
      setVerCode(response.data.results);
    })
    .catch((error) => {
      if (error.response.data.message == "2fa enabled") return setTfaEnabled(true);
    });

  console.log(tfaEnabled);

  function enableOtp() {
    axios
      .post(verifyOtp, {
        email: email,
        code: otp,
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert("2fa enabled");
          setTfaEnabled(true);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function disableOtp() {
    axios
      .post(turnOffOtp, {
        email: email,
      })
      .then((response) => {
        if (response.data.message == "2fa disabled") {
          setTfaEnabled(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="two-factor">
      <h1>Two-Factor Authentication</h1>
      {tfaEnabled ? 
        <div className="btn-div">
          <h3 style={{ color: "white" }}>2FA is enabled</h3>{" "}
          <button onClick={disableOtp} className="aqua-btn">
            Disable
          </button>
        </div>
       : 
        <ol>
          <li>
            Install an authenticator app on your mobile <br /> e.g. Google
            Authenticator, FreeOTP or any other app that supports 6 digit OTPs
          </li>
          {unableToScan ? (
            <div className="qr">
              <li>Open the app and enter the key</li>
              <h3 style={{ color: "white" }}>{verCode}</h3>
              <a onClick={() => setUnableToScan(false)}>Scan Barcode</a>
            </div>
          ) : (
            <>
              <li>Open the app and scan the barcode</li>
              <div className="qr">
                <img src={qrImage} alt="qrCode to OTP" />
                <a onClick={() => setUnableToScan(true)}>Unable to scan?</a>
              </div>
            </>
          )}
          <li>
            <div>
              <p>
                Enter the one-time code provided by the app and click Save to
                finish the setup.
              </p>
              <div className="input-div">
                <label htmlFor="otp">One-time code</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="btn-div">
                <button onClick={enableOtp} className="aqua-btn">
                  Save
                </button>
                <button className="aqua-btn inverse">Cancel</button>
              </div>
            </div>
          </li>
        </ol>
      }
    </div>
  );
};

export default TwoFactor;
