import "./AccountPwd.css";

const AccountPwd = () => {
  return (
    <div className="account pwd">
      <div className="row">
        <h1>Change Password</h1>
        <p>*Required Fields</p>
      </div>
      <div className="input-div">
        <label htmlFor="new-pwd">New Password</label>
        <input type="text" id="new-pwd" />
      </div>
      <div className="input-div">
        <label htmlFor="confirm">Confirmation</label>
        <input type="text" id="confirm" />
      </div>

      <div className="btn-div">
        <button className="aqua-btn">Save</button>
      </div>
    </div>
  );
};

export default AccountPwd;
