import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./helper";

// Function to register a new user
export const registerUser = async (data, header) => {
  /*
    Makes a POST request to register a new user.
    
    Parameters:
    - data: Object containing user data.
    - header: Optional header for the request.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("POST", `${BASE_URL}/api/v1/user/register`, data, header);
};

// Function to get a list of users
export const getUsers = async (search, page) => {
  /*
    Makes a GET request to fetch a list of users.

    Parameters:
    - search: Search string for filtering users.
    - page: Page number for pagination.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("GET", `${BASE_URL}/api/v1/user/details?search=${search}&page=${page}`, "");
};

// Function to get details of a single user
export const getSingleUser = async (id) => {
  /*
    Makes a GET request to fetch details of a single user.

    Parameters:
    - id: ID of the user.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("GET", `${BASE_URL}/api/v1/user/${id}`, "");
};

// Function to edit user details
export const editUser = async (id, data, header) => {
  /*
    Makes a PUT request to edit user details.

    Parameters:
    - id: ID of the user to be edited.
    - data: Object containing updated user data.
    - header: Optional header for the request.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("PUT", `${BASE_URL}/api/v1/user/edit/${id}`, data, header);
};

// Function to delete a user
export const deleteUserApi = async (id) => {
  /*
    Makes a DELETE request to delete a user.

    Parameters:
    - id: ID of the user to be deleted.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("DELETE", `${BASE_URL}/api/v1/user/delete/${id}`, {});
};

// Function to change user status
export const changeUserStatus = async (id, data) => {
  /*
    Makes a PUT request to change user status.

    Parameters:
    - id: ID of the user whose status is to be changed.
    - data: Object containing status data.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("PUT", `${BASE_URL}/api/v1/user/status/${id}`, { data });
};

// Function to export users to CSV
export const exportToCsv = async () => {
  /*
    Makes a GET request to export users to CSV.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("GET", `${BASE_URL}/api/v1/userexport`, "");
};
