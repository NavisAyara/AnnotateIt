import { useState } from "react";

// TODO: Percentage-based positioning for markers (for responsivity)

function UploadDisplay({ imageURL }) {
  const [points, setPoints] = useState([]);
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

function AnnotateSection() {
  const [imgURL, setImgURL] = useState(null);
  const [isJSONLoaded, setIsJSONLoaded] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault(); // the browser will not prepare to open the image
    event.target.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("drag-over"); // add visual feedback
  };

  const handleImageDrop = (event) => {
    event.preventDefault(); // the browser will not open the image after release
    event.target.classList.remove("drag-over"); // remove visual feedback after release

    const file = event.dataTransfer.files[0];
    setImgURL(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click(); // manually invoke the file picker modal
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgURL(URL.createObjectURL(file));
  };

  const saveToJSON = () => {};
  const loadFromJSON = () => {};

  return (
    <div>
      <div
        id="drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleImageDrop}
        className={imgURL ? "is-displaying" : ""}
      >
        {imgURL ? (
          <UploadDisplay imageURL={imgURL} />
        ) : (
          <>
            <p>
              Drag and drop an image or click{" "}
              <span id="upload-button" onClick={handleUploadClick}>
                here
              </span>
            </p>
          </>
        )}
        <input
          onChange={handleImageChange}
          type="file"
          id="file-input"
          style={{ display: "none" }}
        ></input>
      </div>
      <div className="action-buttons">
        <button disabled={imgURL ? false : true} onClick={handleUploadClick}>
          Upload New
        </button>
        <button
          disabled={imgURL && !isJSONLoaded ? false : true}
          onClick={loadFromJSON}
        >
          Load JSON
        </button>
        <button
          disabled={annotations.length > 0 ? false : true}
          onClick={saveToJSON}
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <main>
      <header>
        <h1>AnnotateIt</h1>
      </header>
      <div>
        <AnnotateSection />
      </div>
    </main>
  );
}

export default App;
