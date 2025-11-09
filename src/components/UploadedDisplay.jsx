export default function UploadDisplay({ imageURL, points, setPoints }) {
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
        }}
      />
      <div
        id="hit-area"
        onMouseDown={(event) => {
          const rect = event.target.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const newElem = document.createElement("div");
          newElem.style.position = "absolute";
          newElem.style.width = "50px";
          newElem.style.height = "50px";
          newElem.style.background = "black";
          newElem.style.left = `${(x / rect.width) * 100}%`;
          newElem.style.top = `${(y / rect.height) * 100}%`;
          newElem.style.zIndex = "2";
          newElem.style.transform = `translateX(-50%) translateY(-50%)`;
          event.target.appendChild(newElem);
          let newPoints = [...points];
          newPoints.push({ x: x, y: y });
          setPoints(newPoints);
        }}
        onMouseUp={() => console.log(points)}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: "3",
        }}
      ></div>
    </div>
  );
}
