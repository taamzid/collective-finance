import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./Activity.css";

const Activity = () => {
  const [type, setType] = useState("All");
  return (
    <div className="activity-page token-page">
      <h1>
        Activity <span>Last updated a minute ago</span>
      </h1>
      <div className="activity-tabs">
        <p
          onClick={(e) => {
            // setType(e.target.innerText);
          }}
          className={`${type === "All" ? "active-activity" : ""}`}
        >
          All
        </p>
        <p
          className={`${type === "Sent" ? "active-activity" : ""}`}
          onClick={(e) => {
            // setType(e.target.innerText);
          }}
        >
          Sent
        </p>
        <p
          className={`${type === "Recieved" ? "active-activity" : ""}`}
          onClick={(e) => {
            // setType(e.target.innerText);
          }}
        >
          Recieved
        </p>
      </div>
      <table>
        <thead>
          <th style={{ width: "50px" }}></th>
          <th style={{ width: "200px" }}>DATE</th>
          <th>ACTIVITY</th>
        </thead>
        <tbody>
          {/* <tr>
            <td>
              <FontAwesomeIcon icon={faWallet} className="wallet-icon" />
            </td>
            <td>Last Friday at 8:56 PM</td>
            <td>Wallet is created</td>
          </tr> */}
        </tbody>
      </table>
      <p className="entries">Showing 0 of 0 entries</p>
    </div>
  );
};

export default Activity;
