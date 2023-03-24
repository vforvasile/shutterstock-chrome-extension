import  {  useEffect, useRef, useState } from "react";
import {
  DownloadTableExcel,
  useDownloadExcel,
} from "react-export-table-to-excel";
import "./Popup.css";

function App() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    chrome.storage.local.get("photo-data", function (items) {
      console.log("local storage", items);
      if (items["photo-data"] === undefined) return;
      const localData = items["photo-data"].payload.data;
      if(!data)return
      setData(items["photo-data"].payload.data);
    });
  }, []);

  console.log("state data, ", data);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  return (
    <main>
      <button onClick={onDownload}> Export excel </button>

      <div>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >

        <table ref={tableRef}>
          <tbody>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Edison</td>
              <td>Padilla</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Alberto</td>
              <td>Lopez</td>
              <td>94</td>
            </tr>
          </tbody>
        </table>
        </DownloadTableExcel>
      </div>
    </main>
  );
}

export default App;
