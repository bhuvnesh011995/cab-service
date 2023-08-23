import Title from "./Title";
import "./common.css";

export default function Management_container({ children,title }) {
  return (
    <div className="main-content">
      <div className="page-content">
          <div className="container-fluid">
          <Title title={title} />
          {children}
        </div>
      </div>
    </div>
  );
}
