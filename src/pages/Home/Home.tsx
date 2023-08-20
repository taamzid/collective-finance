import React, { useState } from "react";

import Blockchain from "./Blockchain";

import Footer from "../../components/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { useNavigate } from "react-router-dom";

import "./Home.css";
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown";

const Home = () => {
  const navigate = useNavigate();

  const [selectedBlockChain, setSelectedBlockChain] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="home">
      <div>
        <div className="home__header">
          <div className="home__headerLeft">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => navigate(-1)}
            />

            <img src="assets/logo.png" alt="logo" />
          </div>
          <div
            className="home__user"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faUser} />

            <ProfileDropdown isActive={showDropdown} />
          </div>
        </div>

        <div className="home__topWrapper">
          <div className="home__top">
            <h1 className="home__topHeading">Hi, Welcome to Labz</h1>

            <h1 className="home__topSubheading">Let's get started</h1>

            <p className="home__topPara">
              Since you have no wallets in <span>Labz</span> yet, choose your
              favourite blockchain. Then, create a new wallet or import an
              existing one.
            </p>
          </div>
        </div>

        <div
          className={`home__bottom ${selectedBlockChain ? "" : "show-bottom"}`}
        >
          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            Bitcoin
          </button>

          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            Ethereum
          </button>

          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            VeChain
          </button>

          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            Litecoin
          </button>

          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            GoChain
          </button>

          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            Æternity
          </button>

          <button
            className="home__blockchain"
            // onClick={(e) => setSelectedBlockChain(e.target.textContent)}
          >
            Neo
          </button>
        </div>

        <Blockchain
          // setSelectedBlockChain={setSelectedBlockChain}
          // blockchain={selectedBlockChain}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
