import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Swap.css";

const Swap = () => {
  return (
    <div className="swap-page">
      <h1>Swap</h1>
      <div className="input-div">
        <label htmlFor="from"></label>
        <div>
          <input type="text" id="from" />
          <button>ETH</button>
        </div>
      </div>
      <FontAwesomeIcon icon={faArrowDown} />
      <div className="input-div">
        <label htmlFor="to"></label>
        <div>
          <input type="text" id="to" />
          <select>
            <option value="1 INCH">1 INCH</option>
            <option value="AAVE">AAVE</option>
            <option value="BAT">BAT</option>
            <option value="BONDLY">BONDLY</option>
          </select>
        </div>
      </div>
      <button className="aqua-btn">Swap Assets</button>
    </div>
  );
};

export default Swap;
