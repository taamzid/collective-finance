import "./Application.css";

const Application = () => {
  return (
    <div className="session application">
      <h1>Application</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Application</th>
              <th> Granted Permissions</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem, ipsum dolor.</td>
              <td>Lorem, ipsum dolor.</td>
              <td>Lorem, ipsum dolor.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Application;
