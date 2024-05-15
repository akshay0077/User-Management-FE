import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import Spiner from "../../components/Spiner/Spiner";
import { UpdateDataContext } from "../../components/context/ContextProvider";
import { getSingleUser, editUser } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import "./edit.css";

const Edit = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);
  const [userprofile, setUserProfile] = useState({});

  const { setUpdateData } = useContext(UpdateDataContext);

  const navigate = useNavigate();

  const { id } = useParams();

  // User Status Option : Active, InActive
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // SetInput value of User Entered
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // Set the Status : Active , InActive
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  //Set the Profile Picture
  const setProfile = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the selected file exceeds the allowed size (5MB)
    if (selectedFile && selectedFile.size > 1024 * 1024 * 1) {
      setError("File size exceeds the limit of 1 MB");
    } else {
      setImage(selectedFile);
      setError("");
    }
  };

  const userProfileGet = async () => {
    try {
      const response = await getSingleUser(id);
      if (response && !response.message) {
        setInputData(response);
        setStatus(response.status);
        setImgdata(response.profile);
        setUserProfile(response);
      } else {
        toast.error("This Id user Profile Not Found ");
      }
    } catch (error) {
      toast.error("Error fetching user data");
    } finally {
      setShowSpin(false);
    }
  };

  //User Data Submit
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;
    const validationErrors = [];

    // Validation checks
    if (!fname.trim()) validationErrors.push("First name is required!");
    if (!lname.trim()) validationErrors.push("Last name is required!");
    if (!email.trim()) validationErrors.push("Email is required!");
    if (!email.includes("@")) validationErrors.push("Enter valid email!");
    if (!mobile.trim()) validationErrors.push("Mobile is required!");
    if (mobile.length > 10) validationErrors.push("Enter valid mobile!");
    if (!gender) validationErrors.push("Gender is required!");
    if (!status) validationErrors.push("Status is required!");
    if (!location.trim()) validationErrors.push("Location is required!");

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    // If all validations pass, proceed with form submission
    const data = new FormData();
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("gender", gender);
    data.append("status", status);
    data.append("user_profile", image || imgdata);
    data.append("location", location);

    const config = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await editUser(id, data, config);
      if (response !== undefined) {
        setUpdateData(response);
        toast.success("Profile updated successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
    // }
  };

  useEffect(() => {
    userProfileGet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (image) {
      setImgdata("");
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          {Object.keys(userprofile).length === 0 ? (
            <h1 className="text-center">404 - User Profile Not Found</h1>
          ) : (
            <>
              <h2 className="text-center mt-1">Update Your Details</h2>
              <Card className="shadow mt-3 p-3">
                <div className="profile_div text-center">
                  <img
                    src={image ? preview : `${BASE_URL}/uploads/${imgdata}`}
                    alt="img"
                  />
                </div>

                <Form>
                  <Row>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fname"
                        value={inputdata.fname}
                        onChange={setInputValue}
                        placeholder="Enter FirstName"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lname"
                        value={inputdata.lname}
                        onChange={setInputValue}
                        placeholder="Enter LastName"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inputdata.email}
                        onChange={setInputValue}
                        placeholder="Enter Email"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile"
                        value={inputdata.mobile}
                        onChange={setInputValue}
                        placeholder="Enter Mobile"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Your Gender</Form.Label>
                      <Form.Check
                        type={"radio"}
                        label={`Male`}
                        name="gender"
                        value={"Male"}
                        checked={inputdata.gender === "Male" ? true : false}
                        onChange={setInputValue}
                      />
                      <Form.Check
                        type={"radio"}
                        label={`Female`}
                        name="gender"
                        value={"Female"}
                        checked={inputdata.gender === "Female" ? true : false}
                        onChange={setInputValue}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Your Status</Form.Label>
                      <Select
                        options={options}
                        defaultValue={status}
                        onChange={setStatusValue}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Select Your Profile</Form.Label>
                      <Form.Control
                        type="file"
                        name="user_profile"
                        onChange={setProfile}
                        placeholder="Select Your Profile"
                      />
                       {error && <p className="text-danger">{error}</p>}
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-lg-6"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Enter Your Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={inputdata.location}
                        onChange={setInputValue}
                        placeholder="Enter Your Location"
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      type="submit"
                      onClick={submitUserData}
                    >
                      Submit
                    </Button>
                  </Row>
                </Form>
              </Card>
            </>
          )}
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Edit;
