import { useState } from "react";

function Marker({ id, localX, localY, points, setPoints, name }) {
  const [label, setLabel] = useState(name ?? "");

  const updateLabel = (e) => {
    setLabel(e.target.value);
    const updatedPoints = { ...points };
    updatedPoints[id].name = e.target.value;
    setPoints(updatedPoints);
  };

  return (
    <div
      id={id}
      style={{
        left: `${localX}%`,
        top: `${localY}%`,
        position: "absolute",
        zIndex: 3,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="marker"></div>
      <div className="label">
        <input type="text" value={label} onChange={updateLabel} />
      </div>
    </div>
  );
}

export default Marker;
