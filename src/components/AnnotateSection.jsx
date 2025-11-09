import { useState } from "react";
import UploadDisplay from "./UploadedDisplay";

export default function AnnotateSection() {
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
          <UploadDisplay
            imageURL={imgURL}
            points={annotations}
            setPoints={setAnnotations}
          />
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
