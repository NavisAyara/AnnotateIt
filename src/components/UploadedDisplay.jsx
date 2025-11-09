export default function UploadDisplay({ imageURL, points, setPoints }) {
  let x, y, boundingBox, mouseEvent;

  const createMarker = (event, rect, localX, localY) => {
    const newElem = document.createElement("div");
    newElem.className = "marker";
    newElem.style.left = `${localX}%`;
    newElem.style.top = `${localY}%`;
    newElem.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    event.target.parentNode.appendChild(newElem);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <img
        // onClick={initiateUpload}
        src={imageURL}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: "1",
          objectFit: "fill",
        }}
      />
      <div
        id="hit-area"
        onMouseDown={(event) => {
          boundingBox = event.target.getBoundingClientRect();
          x = event.clientX - boundingBox.left;
          x = (x / boundingBox.width) * 100;
          y = event.clientY - boundingBox.top;
          y = (y / boundingBox.height) * 100;
          mouseEvent = event;
        }}
        onMouseUp={() => {
          let newPoints = [...points];
          newPoints.push({ x: x, y: y });
          setPoints(newPoints);
          createMarker(mouseEvent, boundingBox, x, y);
          console.log(newPoints);
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: "2",
        }}
      ></div>
    </div>
  );
}
