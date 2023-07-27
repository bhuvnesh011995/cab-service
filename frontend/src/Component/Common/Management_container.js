import Title from "./Title";
import "./common.css";

export default function Management_container({ children,title }) {
  return (
    <div class="main-content">
      <div class="page-content">
          <div class="container-fluid">
          <Title title={title} />
          {children}
        </div>
      </div>
    </div>
  );
}
