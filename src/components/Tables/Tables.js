import React from "react";

import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

import { IoMdEye } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

import Paginations from "../pagination/Paginations";
import { changeUserStatus } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import "./table.css";

const Tables = ({
  userData,
  handleDeleteUser,
  handleFetchUsers,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  handleSetPage,
}) => {
  // Function to handle status change
  const handleChange = async (id, status) => {
    try {
      const response = await changeUserStatus(id, status);

      if (response !== undefined) {
        handleFetchUsers();
        toast.success("Status Updated");
      } else {
        toast.error("Failed to update status ");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  return (
    <div className="container">
      <Row>
        <div className="col mt-0">
          <Card className="shadow">
            <Table className="align-items-center" responsive="sm">
              <thead className="thead-dark">
                <tr className="table-dark">
                  <th>ID</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>&nbsp;&nbsp;&nbsp;Status</th>
                  <th>Profile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((element, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1 + (currentPage - 1) * 4}</td>
                          <td>{element.fname + "   " + element.lname}</td>
                          <td>{element.email}</td>
                          <td>{element.gender === "Male" ? "M" : "F"}</td>
                          <td className="d-flex align-items-center">
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                className="dropdown_btn"
                                id="dropdown-basic"
                              >
                                <Badge
                                  bg={
                                    element.status === "Active"
                                      ? "primary"
                                      : "danger"
                                  }
                                >
                                  {element.status} <FaChevronDown />
                                </Badge>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "Active")
                                  }
                                >
                                  Active
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "InActive")
                                  }
                                >
                                  InActive
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className="img_parent">
                            <img
                              src={`${BASE_URL}/uploads/${element.profile}`}
                              alt="img"
                            />
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="white"
                                id="dropdown-basic"
                              >
                                <FaEllipsisVertical />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/userprofile/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <IoMdEye size={22} color="green" />{" "}
                                    <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/edit/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <FaRegEdit size={19} color="blue" />{" "}
                                    <span>Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div
                                    onClick={() =>
                                      handleDeleteUser(element._id)
                                    }
                                  >
                                    <MdDelete size={23} color="red" />
                                    <span>Delete</span>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <div className="no_data text-center">NO Data Found</div>
                )}
              </tbody>
            </Table>
            <Paginations
              handlePrevious={handlePreviousPage}
              handleNext={handleNextPage}
              page={currentPage}
              pageCount={totalPages}
              setPage={handleSetPage}
            />
          </Card>
        </div>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Tables;
