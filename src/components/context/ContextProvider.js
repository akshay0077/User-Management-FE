import React, { createContext, useState } from "react";

// Create context objects
export const AddDataContext = createContext();
export const UpdateDataContext = createContext();
export const DeleteDataContext = createContext();

const ContextProvider = ({ children }) => {
  // State variables for user data, update data, and deleted data
  const [userData, setUserData] = useState([""]);
  const [updateData, setUpdateData] = useState("");
  const [deleteData, setDeleteData] = useState("");

  return (
    // Provide context values to the nested components

    <AddDataContext.Provider value={{ userData, setUserData }}>
      <UpdateDataContext.Provider value={{ updateData, setUpdateData }}>
        <DeleteDataContext.Provider value={{ deleteData, setDeleteData }}>
          {children}
        </DeleteDataContext.Provider>
      </UpdateDataContext.Provider>
    </AddDataContext.Provider>
  );
};

export default ContextProvider;
