import "./Transaction.css";
const Transaction = () => {
  return (
    <div className="transaction-page">
      <h1>Send Funds</h1>
      <div className="input-div">
        <label htmlFor="to">
          To Wallet / Address / E-mail / Unstoppable domain
        </label>
        <input type="text" id="to" />
      </div>
      <div className="input-div">
        <label htmlFor="amount">
          Amount (Available Balance after transaction 0.00000 ETH)
        </label>
        <div>
          <input type="text" id="amount" />
          <button>ETH</button>
        </div>
      </div>
      <button className="aqua-btn">Send Funds</button>

      <p className="note">
        After clicking on 'Send Funds', a pop-up will open where you will be
        asked to confirm the transaction using your pin code.
      </p>
    </div>
  );
};

export default Transaction;
