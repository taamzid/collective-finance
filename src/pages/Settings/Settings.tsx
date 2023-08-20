import "./Settings.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";

export default function Settings() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="bottom-settings">
      <div
        onClick={() => setSidebar(false)}
        className={`set-overlay ${sidebar ? "open-overlay" : ""}`}
      ></div>
      <FontAwesomeIcon
        onClick={() => setSidebar(true)}
        icon={faBars}
        className="mob-icon"
      />
      <div className={`left-settings ${sidebar ? "left-settings-open" : ""}`}>
        {" "}
        <FontAwesomeIcon
          onClick={() => setSidebar(false)}
          icon={faXmark}
          className="mob-icon"
        />
        <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/"}
        >
          Account
        </NavLink>
        <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/password"}
        >
          Password
        </NavLink>
        <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/two-factor"}
        >
          Two-factor Authentication
        </NavLink>
        {/* <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/social"}
        >
          Social Logins
        </NavLink> */}
        {/* <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/session"}
        >
          Sessions
        </NavLink> */}
        {/* <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/application"}
        >
          Applications
        </NavLink>
        <NavLink
          onClick={() => setSidebar(false)}
          className={({ isActive }) => {
            return isActive ? "active-settings-link" : "";
          }}
          to={"/inventory/settings/log"}
        >
          Log
        </NavLink> */}
      </div>
      <div className="right-settings">
        <Outlet />
      </div>
    </div>
  );
}
