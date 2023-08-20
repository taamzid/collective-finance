import "./Log.css";

const Log = () => {
  return (
    <div className="log session">
      <h1>Account Log</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>IP</th>
              <th>Client</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oct 3, 2022, 9:29:50 AM</td>
              <td>login</td>
              <td>205.164.157.93</td>
              <td>Arkane</td>
              <td>username = sikander.aaa@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Log;
