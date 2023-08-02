import { useState } from "react";

export default function Content({ heading, text, setUpdates, setKey }) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(text);
  return (
    <div className="row mb-2" style={{ width: "400px", margin: "30px" }}>
      <label
        className="col"
        style={{
          fontWeight: "600",
        }}
      >
        {heading}
      </label>
      {!edit ? (
        <span className="col" style={{ display: "block" }}>
          <span className="m-2">{content}</span>
          <i
            onClick={() => setEdit(true)}
            style={{ cursor: "pointer" }}
            className="bi bi-pencil"
          ></i>
        </span>
      ) : (
        <input
          className="col"
          autoFocus
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          onBlur={(e) => {
            setUpdates(preVal => ({...preVal,[setKey]:content}))
            setEdit(false);
          }}
        />
      )}
    </div>
  );
}
