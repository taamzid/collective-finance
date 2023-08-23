import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaste, faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faArrowRightArrowLeft,
  faRotate,
  faHorse,
  faCoins,
  faChartLine,
  faGrip,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Inventory.css";
import ProfileDropdown from "../../components/ProfileDropdown/ProfileDropdown";
import RPC from "../web3RPC/web3RPC";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import axios from "axios";
const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

export default function Inventory() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [address, setAddress] = useState("");
  const [torusPlugin, setTorusPlugin] =
    useState<TorusWalletConnectorPlugin | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState("");
  const [nfts, setNFTs] = useState<any[]>([]);

  function copyAddress() {
    navigator.clipboard.writeText(address).then(() => {
      alert("Wallet Address Copied");
    });
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            appName: "W3A",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
            theme: "light",
            loginMethodsOrder: ["apple", "google", "twitter"],
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 3,
            primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
          },
          web3AuthNetwork: "cyan",
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: "redirect", // "redirect" | "popup"
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
              dark: false, // whether to enable dark mode. defaultValue: false
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        // plugins and adapters are optional and can be added as per your requirement
        // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

        // adding torus wallet connector plugin

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        setTorusPlugin(torusPlugin);
        await web3auth.addPlugin(torusPlugin);

        // adding wallet connect v2 adapter
        const defaultWcSettings = await getWalletConnectV2Settings(
          "eip155",
          [1, 137, 5],
          "04309ed1007e77d1f119b85205bb779d"
        );
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: { ...defaultWcSettings.adapterSettings },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);

        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: "cyan",
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        const torusWalletAdapter = new TorusWalletAdapter({
          clientId,
        });

        // it will add/update  the torus-evm adapter in to web3auth class
        web3auth.configureAdapter(torusWalletAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    uiConsole(address);
    console.log(address);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (!provider) {
          console.log("Provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const accounts = await rpc.getAccounts();
        setAddress(accounts[0]);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [provider]);

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
    uiConsole(balance);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!provider) {
          console.log("Provider not initialized yet");
          return;
        }
        const rpc = new RPC(provider);
        const balance = await rpc.getBalance();
        setBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, [provider]);

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  useEffect(() => {
    axios
      .get("https://chat-backends-d0a914c9d2e6.herokuapp.com/wallet/getNft")
      .then((response) => {
        const data = response.data;
        console.log(data.data, "data");
        setNFTs(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="inventory">
      <div className="header__wrapper">
        <div className="inventory__header">
          <div className="inventory__headerLeft">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="inventory__headerBack"
              onClick={() => navigate(-1)}
            />

            <img src="assets/logo.png" alt="logo" />
          </div>

          <div
            className="inventory__user"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faUser} />

            <ProfileDropdown isActive={showDropdown} />
          </div>
        </div>
      </div>

      <div className="inventory__topWrapper">
        <div className="inventory__top">
          <div className="inventory__topUp">
            <span>{balance} USD</span>
          </div>

          <div className="inventory__topDown">
            <span className="inventory__id">
              {address}{" "}
              <FontAwesomeIcon
                onClick={copyAddress}
                style={{ cursor: "pointer" }}
                icon={faPaste}
              />
            </span>

            <span className="inventory__buy">Buy ETH</span>
          </div>
        </div>
      </div>

      <div className="inventory__centerWrapper">
        <div className="inventory__center">
          <div className="inventory__centerLeft">
            {/* <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/"}
            >
              <FontAwesomeIcon icon={faHorse} />
              <span>NFT</span>
            </NavLink> */}

            <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/token"}
            >
              <FontAwesomeIcon icon={faCoins} />
              <span>Tokens</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/OwnNft/"}
            >
              <FontAwesomeIcon icon={faHorse} />
              <span>My NFTs</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/MintNft/"}
            >
              <FontAwesomeIcon icon={faHorse} />
              <span>Mint NFTs</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/transaction"}
            >
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              <span>Transactions</span>
            </NavLink>
            {/* <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/activity"}
            >
              <FontAwesomeIcon icon={faChartLine} />
              <span>Activity</span>
            </NavLink>
            <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/app"}
            >
              <FontAwesomeIcon icon={faGrip} />
              <span>App</span>
            </NavLink> */}
            <NavLink
              className={({ isActive }) => {
                return isActive ? "inventory__selected" : "";
              }}
              to={"/inventory/settings/"}
            >
              <FontAwesomeIcon icon={faGear} />
              <span>Settings</span>
            </NavLink>
          </div>

          <div className="inventory__centerRight">
            <div className="dashboard-wrap">
              {/* <div className="wallets">
                <Wallet />
                <div className="row">
                  <FontAwesomeIcon icon={faPlus} />
                  <FontAwesomeIcon icon={faUpload} />
                </div>
              </div> */}
              <div className="main-dash">
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <p>Balance</p>
                      <h3>
                        {balance} <sup>USD</sup>
                        {/* <a href="#">Buy ETH</a>{" "} */}
                      </h3>
                    </div>
                    <div className="row">
                      <p>Tokens</p>
                      {nfts.length === 0 ? (
                        <h4>No tokens found</h4>
                      ) : (
                        <h4>{nfts.length} tokens found</h4>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <p>Address</p>
                      <h4>
                        {address}{" "}
                        <FontAwesomeIcon
                          style={{ cursor: "pointer" }}
                          icon={faCopy}
                          onClick={copyAddress}
                        />
                      </h4>
                    </div>
                    {/* <div className="row">
                      <p>Connected Apps</p>
                      <h4>No connected apps found</h4>
                    </div> */}
                    {/* <div>
                      <CrossmintPayButton
                        collectionId="ffb4f453-659d-48bd-99d7-8f45f792ff73"
                        projectId="31feedb2-4ae4-4328-9efe-9bc177f9fb24"
                        mintConfig={{
                          type: "managed-metaplex",
                          totalPrice: "1",
                          quantity: "1",
                        }}
                        environment="staging"
                        mintTo={address}
                      />
                    </div> */}
                    <div></div>
                  </div>
                </div>
                <hr style={{ width: "100%", margin: "10px 0px" }} />
                <div className="dash-comps">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inventory__footerWrapper">
        <div className="inventory__footer">
          {/* <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/"}
          >
            <FontAwesomeIcon icon={faHorse} />
            <span>NFT</span>
          </NavLink> */}
          <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/token"}
          >
            <FontAwesomeIcon icon={faCoins} />
            <span>Tokens</span>
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/transaction"}
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            <span>Transactions</span>
          </NavLink>
          {/* <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/swap"}
          >
            <FontAwesomeIcon icon={faRotate} />
            <span>Swap</span>
          </NavLink> */}
          {/* <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/activity"}
          >
            <FontAwesomeIcon icon={faChartLine} />
            <span>Activity</span>
          </NavLink> */}
          {/* <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/app"}
          >
            <FontAwesomeIcon icon={faGrip} />
            <span>App</span>
          </NavLink> */}
          <NavLink
            className={({ isActive }) => {
              return isActive ? "inventory__selected" : "";
            }}
            to={"/inventory/settings/"}
          >
            <FontAwesomeIcon icon={faGear} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      <Footer />
    </div>
  );
}
