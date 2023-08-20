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

const App = () => {
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
