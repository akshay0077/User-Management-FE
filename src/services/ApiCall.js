import axios from "axios";

export const commonrequest = async (method, url, body, header) => {
    try {
        const config = {
            method: method,
            url: url,
            headers: header ? header : { "Content-Type": "application/json" },
            data: body
        };

        const response = await axios(config);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error("Unexpected status code: " + response.status);
        }
    } catch (error) {
        console.log("Error in commonrequest:", error);
        return error;
    }
};
