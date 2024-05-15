import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { AddDataContext } from "../../components/context/ContextProvider";
import { registerUser } from "../../services/Apis";
import "./register.css";

const Register = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  const { setUserData } = useContext(AddDataContext);

  // User Status Option : Active, InActive
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // Set User Input Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // Set the Status (Active, InActive)
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  // Set the Profile Picture
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

  //Submit the User Data
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

    const data = new FormData();
    data.append("fname", fname);
    data.append("lname", lname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("gender", gender);
    data.append("status", status);
    data.append("user_profile", image);
    data.append("location", location);

    const config = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await registerUser(data, config);

      if (response !== undefined) {
        setInputData({
          ...inputdata,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        setUserData(response.data);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error for Creating New User profile");
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-1">Register Your Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center">
            <img src={preview ? preview : "/man.png"} alt="img" />
          </div>

          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={inputdata.fname}
                  onChange={setInputValue}
                  placeholder="Enter FirstName"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={inputdata.lname}
                  onChange={setInputValue}
                  placeholder="Enter LastName"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputdata.email}
                  onChange={setInputValue}
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={inputdata.mobile}
                  onChange={setInputValue}
                  placeholder="Enter Mobile"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={`Male`}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select options={options} onChange={setStatusValue} />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control
                  type="file"
                  name="user_profile"
                  onChange={setProfile}
                  placeholder="Select Your Profile"
                />
                {error && <p className="text-danger">{error}</p>}
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={inputdata.location}
                  onChange={setInputValue}
                  placeholder="Enter Your Location"
                />
              </Form.Group>
              <Button variant="danger" type="submit" onClick={submitUserData}>
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Register;
