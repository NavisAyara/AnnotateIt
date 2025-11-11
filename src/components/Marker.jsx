function Marker({ id, localX, localY }) {
  return (
    <div
      id={id}
      className="marker"
      style={{
        left: `${localX}%`,
        top: `${localY}%`,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    ></div>
  );
}

export default Marker;
