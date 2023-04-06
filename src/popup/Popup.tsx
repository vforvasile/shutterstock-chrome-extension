import { useEffect, useState } from "react";
 // @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./Popup.css";
import { PhotoType } from "./types";

function App() {
  const [data, setData] = useState<PhotoType[]>([]);

  useEffect(() => {
    chrome.storage.local.get("photo-data", function (items) {
      if (items["photo-data"] === undefined) return;
      const localData = items["photo-data"].payload.data;
      if (!localData) return;
      setData(prevData => [...prevData, ...localData]);
    });
  }, []);

  if (!data.length) return null;

  return (
    <main>
      <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="PhotoData"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <table id="table-to-xls">
            <tr>
              <th>Photo</th>
              <th>Thumb</th>
              <th>Label</th>
              <th>Percentage</th>
            </tr>
            {data.map((photo: PhotoType) => (
              <>
                <tr>
                  <td rowSpan={photo.labels.length+1}>{photo.id}</td>
                  <td rowSpan={photo.labels.length+1}>{photo.image}</td>
                </tr>

                {photo.labels.map((label) => (
                  <tr>
                    <td>{label.name}</td>
                    <td>{label.percentage}</td>
                  </tr>
                ))}
              </>
            ))}
          </table>
      </div>
    </main>
  );
}

export default App;
