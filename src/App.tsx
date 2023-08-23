import TermsConditions from "./pages/TermsConditions/TermsConditions";
import EmailVerification from "./pages/EmailVerification/EmailVerification";
import MasterPin from "./pages/MasterPin/MasterPin";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import Nft from "./pages/Nft/Nft";
import Tokens from "./pages/Tokens/Tokens";
import Transaction from "./pages/Transaction/Transaction";
import Swap from "./pages/Swap/Swap";
import Activity from "./pages/Activity/Activity";
import Apps from "./pages/Apps/Apps";
import Terms from "./pages/Terms/Terms";
import Settings from "./pages/Settings/Settings";
import Account from "./pages/Account/Account";
import AccountPwd from "./pages/AccountPwd/AccountPwd";
import TwoFactor from "./pages/TwoFactor/TwoFactor";
import Socials from "./pages/Socials/Socials";
import Session from "./pages/Session/Session";
import Application from "./pages/Application/Application";
import Log from "./pages/Log/Log";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import PrivacyPolicy from "./pages/Privacy Policy/PrivacyPolicy";
import NFTOWN from "./pages/OwnNft/OwnNft";
import NFTDisplay from "./pages/NftMint/MintNft";
import { useState } from "react";

const App = () => {
  const [address, setAddress] = useState("");
  const nfts = [
    {
      tokenId: 1,
      name: "NFT 1",
      imageSrc: "https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE",
      address: address,
      price: "0.1",
    },
    {
      tokenId: 2,
      name: "NFT 2",
      imageSrc: "https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE",
      address: address,
      price: "0.2",
    },
    {
      tokenId: 3,
      name: "NFT 3",
      imageSrc: "https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE",
      address: address,
      price: "0.3",
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/terms-conditions" element={<TermsConditions />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/verify" element={<EmailVerification />} />

        <Route path="/master-pin" element={<MasterPin />} />

        <Route path="/home" element={<Home />} />

        <Route path="/inventory" element={<Inventory />}>
          <Route path="" element={<Nft />} />
          <Route path="token" element={<Tokens />} />
          <Route path="OwnNft" element={<NFTOWN />} />
          <Route path="MintNft" element={<NFTDisplay nfts={nfts} />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="swap" element={<Swap />} />
          <Route path="activity" element={<Activity />} />
          <Route path="app" element={<Apps />} />
          <Route path="settings" element={<Settings />}>
            <Route path="" element={<Account />} />
            <Route path="password" element={<AccountPwd />} />
            <Route path="two-factor" element={<TwoFactor />} />
            <Route path="social" element={<Socials />} />
            <Route path="session" element={<Session />} />
            <Route path="application" element={<Application />} />
            <Route path="log" element={<Log />} />
          </Route>
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
