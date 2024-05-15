import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { FiPlus } from "react-icons/fi";
import { Container, Row, Col } from "react-bootstrap";

import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
// AddDataContext,
import {UpdateDataContext,DeleteDataContext} from "../../components/context/ContextProvider";
import { getUsers, deleteUserApi, exportToCsv } from "../../services/Apis";
import "./home.css";

const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // const { userData, setUserData } = useContext(AddDataContext);
  const { updateData, setUpdateData } = useContext(UpdateDataContext);
  const { deleteData, setDeleteData } = useContext(DeleteDataContext);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  };

  // Get The User Data
  const userGet = async () => {
    try {
      const response = await getUsers(search, page);
      if (response !== undefined) {
        setUsersData(response.usersData);
        setPageCount(response.Pagination.pageCount);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Delete The Perticular User Based on Id
  const deleteUser = async (id) => {
    const response = await deleteUserApi(id);
    if (response !== undefined) {
      userGet();
      setDeleteData(response);
    } else {
      toast.error("error");
    }
  };

  // Export User Data in to CSV file
  const exportuser = async () => {
    const response = await exportToCsv();
    console.log(response);
    if (response !== undefined) {
      window.open(response.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };

  // Pagination Handle
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // Click in to Next Button
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return (
    <>
      {/* {userData ? (
        <Alert variant="success" onClose={() => setUserData("")} dismissible>
          {userData.fname} Succesfully Added
        </Alert>
      ) : (
        ""
      )} */}

      {updateData ? (
        <Alert variant="primary" onClose={() => setUpdateData("")} dismissible>
          {updateData.fname.toUpperCase()} Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {deleteData ? (
        <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {deleteData.fname.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <Container className="main_div mt-4">
          <Row className="search_add d-flex justify-content-between">
            <Col xs={12} lg={4} className="mb-3 mb-lg-0">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="danger">Search</Button>
              </Form>
            </Col>
            <Col xs={12} lg={8} className="d-flex justify-content-end">
              <div className="add_btn px-2">
                <Button variant="danger" onClick={adduser}>
                  <FiPlus size={22} /> Add User
                </Button>
              </div>
              <div className="export_csv px-2">
                <Button variant="danger" onClick={exportuser}>
                  Export To Csv
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="my-5">
          {showspin ? (
            <Spiner />
          ) : (
            <Tables
              userData={usersData}
              handleDeleteUser={deleteUser}
              handleFetchUsers={userGet}
              handlePreviousPage={handlePrevious}
              handleNextPage={handleNext}
              currentPage={page}
              totalPages={pageCount}
              handleSetPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
