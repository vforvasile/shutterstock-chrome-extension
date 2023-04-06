import { parseImageData } from "../popup/utils";

const parsedData = parseImageData();

// Communicate with background file by sending a message

(async () => {
  const response = await chrome.runtime.sendMessage({
    payload: {
      message: "Data from Web page",
      data: parsedData,
    },
  });
  // do something with response here, not outside the function
})();

export {};
