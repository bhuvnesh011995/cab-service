export default function Table({ heading, list ,tableHeading}) {
  let head = heading.map((ele, i) => {
    return <th key={i}>{ele}</th>;
  });

  return (
    <div className="row" style={{width:"100%"}}>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{ tableHeading}</h4>
            <div className="table-rep-plugin">
              <div
                className="table-responsive mb-0"
                data-pattern="priority-columns"
              >
                <table id="tech-companies-1" className="table table-striped">
                  <thead>
                    <tr>
                      {head}
                    </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
