import { useEffect, useRef, useState } from "react";
import {
  DownloadTableExcel,
  useDownloadExcel,
} from "react-export-table-to-excel";
import "./Popup.css";
import { PhotoType } from "./types";

function App() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    chrome.storage.local.get("photo-data", function (items) {
      console.log("local storage", items);
      if (items["photo-data"] === undefined) return;
      const localData = items["photo-data"].payload.data;
      if (!data) return;
      setData(items["photo-data"].payload.data);
    });
  }, []);

  console.log("state data, ", data);

  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef?.current,
  //   filename: "Users table",
  //   sheet: "Users",
  // });

  if (!data.length) return null;

  return (
    <main>


      <div>
      <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>

                </DownloadTableExcel>
          <table ref={tableRef}>
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
