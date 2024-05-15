import axios from "axios";

// Function for making HTTP requests
export const commonRequest = async (method, url, body, header) => {
  try {
    const config = {
      method: method,
      url: url,
      headers: header ? header : { "Content-Type": "application/json" },
      data: body,
    };

    // Making request using Axios
    const response = await axios(config);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Unexpected status code: " + response.status);
    }
  } 
  catch(error){
    if (error.response && error.response.status === 409) {
      return { error: error.response.data.error };
    } else {
      console.log("Error in commonrequest:", error);
      return error;
    }
  }
};
