export default function Card({content}) {
  return (
    <div className="card" style={{width: "13rem",margin:"10px"}}>
  <div className="card-body">
    <h5 className="card-title">{content}</h5>
    <p className="card-text">0</p>
  </div>
</div>
  );
}
