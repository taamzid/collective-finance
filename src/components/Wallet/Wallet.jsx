import "./Wallet.css";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wallet = () => {
  return (
    <div className="wallet-box">
      <h2>* Out of gas gibbon</h2>
      <p>
        0x981e64...50d243fEC78ec <FontAwesomeIcon icon={faCopy} />
      </p>
      <h3>
        0.00000 <sup>ETH</sup>
      </h3>
    </div>
  );
};

export default Wallet;
