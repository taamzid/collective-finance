import "./Session.css";

const Session = () => {
  return (
    <div className="session">
      <h1>Sessions</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>IP</th>
              <th>Started</th>
              <th>Last Access</th>
              <th>Expires</th>
              <th>Clients</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>205.164.157.93</td>
              <td>Oct 3, 2022, 9:29:50 AM</td>
              <td>Oct 3, 2022, 10:33:04 AM</td>
              <td>Nov 2, 2022, 9:29:50 AM</td>
              <td>Arkane account</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="aqua-btn">Log out of all sessions</button>
    </div>
  );
};

export default Session;
