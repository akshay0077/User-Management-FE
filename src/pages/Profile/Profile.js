import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { MdEmail } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaRegDotCircle } from "react-icons/fa";

import Spiner from "../../components/Spiner/Spiner";
import { getSingleUser } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import "./profile.css";

const Profile = () => {
  const [userprofile, setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  // Extracting id from URL parameters
  const { id } = useParams();

  // Function to fetch user profile data
  const userProfileGet = async () => {
    try {
      const response = await getSingleUser(id);
      if (response && !response.message) { 
        setUserProfile(response);
    } else {
        toast.error( "This Id user Profile Not Found ");
    }
    } catch (error) {
      toast.error("Error fetching user profile:", error);
    } finally {
      setShowSpin(false);
    }
  };

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
        {Object.keys(userprofile).length === 0 ? (
            <h1 className="text-center">404 - User Profile Not Found</h1>
          ) :(
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img
                      src={`${BASE_URL}/uploads/${userprofile.profile}`}
                      alt=""
                    />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userprofile.fname + " " + userprofile.lname}</h3>
                <h4>
                  <MdEmail />
                  &nbsp;:- <span>{userprofile.email}</span>
                </h4>
                <h5>
                  <FaMobileAlt />
                  &nbsp;:- <span>{userprofile.mobile}</span>
                </h5>
                <h4>
                  <IoPersonCircle />
                  &nbsp;:- <span>{userprofile.gender}</span>
                </h4>
                <h4>
                  <IoLocationSharp />
                  &nbsp;:- <span>{userprofile.location}</span>
                </h4>
                <h4>
                  <FaRegDotCircle/>
                  &nbsp;:- <span>{userprofile.status}</span>
                </h4>
                <h5>
                  <SlCalender />
                  &nbsp;Date Created&nbsp;:-
                  <span>
                    {moment(userprofile.datecreated).format("DD-MM-YYYY")}
                  </span>
                </h5>
               
              </div>
            </Card.Body>
          </Card>
        )}
          <ToastContainer position="top-center"/>
        </div>
      )}
    </>
  );
};

export default Profile;
