export default function BtnDark({ handleClick, title }) {
  return (
    <button
      onClick={(e) => handleClick(e)}
      type="button"
      className="btn me-3 btn-outline-primary waves-effect waves-light"
    >
      {title}
    </button>
  );
}
