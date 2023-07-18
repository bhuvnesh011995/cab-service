export default function Graph1() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-sm-flex flex-wrap">
          <h4 className="card-title mb-4">Email Sent</h4>
          <div className="ms-auto">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Week
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Month
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Year
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="stacked-column-chart" className="apex-charts" dir="ltr"></div>
      </div>
    </div>
  );
}
