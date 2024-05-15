import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
import {
  addData,
  dltdata,
  updateData,
} from "../../components/context/ContextProvider";
import { usergetfunc, deletfunc, exporttocsvfunc } from "../../services/Apis";
import "./home.css";

const Home = () => {
  const [usersData, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { useradd, setUseradd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDLtdata } = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  };

  // get user
  const userGet = async () => {
    try {
      const response = await usergetfunc(search, page);
      if (response !==undefined) {
        setUserData(response.usersData);
        setPageCount(response.Pagination.pageCount);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // user delete
  const deleteUser = async (id) => {
    const response = await deletfunc(id);
    if (response !== undefined) {
      userGet();
      setDLtdata(response);
    } else {
      toast.error("error");
    }
  };

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    console.log(response);
    if (response !== undefined) {
      window.open(response.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };

  // pagination
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // handle next btn
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
    }, 1200);
  }, [search, page]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>
          {deletedata.fname.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
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
            </div>
            <div className="d-flex ">
              <div className="add_btn px-2">
                <Button variant="danger" onClick={adduser}>
                  {" "}
                  <i class="fa-solid fa-plus"></i>&nbsp; Add User
                </Button>
              </div>
              <div className="export_csv">
                <Button variant="danger" onClick={exportuser}>
                  Export To Csv
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          {showspin ? (
            <Spiner />
          ) : (
            <Tables
              userdata={usersData}
              deleteUser={deleteUser}
              userGet={userGet}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
