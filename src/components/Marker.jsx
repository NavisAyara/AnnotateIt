function Marker({ id, localX, localY }) {
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
        <input type="text" />
      </div>
    </div>
  );
}

export default Marker;
