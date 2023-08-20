import "./Socials.css";

const Socials = () => {
  return (
    <div className="social">
      <h1>Social Logins</h1>
      <div className="social-row">
        <label htmlFor="google">Google</label>
        <input type="text" id="google" />
        <button className="aqua-btn">Add</button>
      </div>
      <div className="social-row">
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" />
        <button className="aqua-btn">Add</button>
      </div>
      <div className="social-row">
        <label htmlFor="twiiter">Twitter</label>
        <input type="text" id="twiiter" />
        <button className="aqua-btn">Add</button>
      </div>
    </div>
  );
};

export default Socials;
