import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import './Order.css';
import profileIcon from "../utils/Images/iconamoon_profile-circle-fill.png";
import Button from '../components/Button'; // Adjust the import path as necessary
import MyOrders from '../components/MyOrders'; // Adjust the import path as necessary

const Order = () => {
    const [divWidth, setDivWidth] = useState(0);
    // const [currentComponent, setCurrentComponent] = useState("My Bookings"); //Set current component to My Bookings
    // const handleClick = (component) => {
    //   setCurrentComponent(component);
    // };
    // Hardcoded user ID for now
    const userId = 3;
    const [userdata, setUserdata] = useState([
      {
        Id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        dob: "1990-01-01",
        nic: "123456789V",
        contactNo: "1234567890",
        userName: "johndoe",
        password: "password",
        userType: "admin",
        ownVehicleType: "car",
        drivingLicenseNo: "B1234567",
        isDeleted: false,
        requestStatus: true,
        address: "123 Main St, City, Country"
      }
    ]);
    const history = useNavigate();

    console.log(userId);

    const buttonStyle = {
      backgroundColor: "rgba(217, 217, 217, 1)",
      color: "black", // Optionally change text color to ensure readability
      //width: "35%",
    };

    useEffect(() => {
      function handleResize() {
        const width = document.getElementById("getWidth")?.offsetWidth;
        setDivWidth(width || 0);
      }

      handleResize(); // Get initial width
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    // useEffect(() => {
    //   axios
    //     .get(
    //       `https://localhost:7196/api/userData/findUserById/${userId}`
    //     )
    //     .then((response) => {
    //       setUserdata(
    //         response.data.map((user) => ({
    //           Id: user.id,
    //           firstName: user.firstName,
    //           lastName: user.lastName,
    //           email: user.email,
    //           dob: user.dob,
    //           nic: user.nic,
    //           contactNo: user.contactNo,
    //           userName: user.userName,
    //           password: user.password,
    //           userType: user.userType,
    //           ownVehicleType: user.ownVehicleType,
    //           drivingLicenseNo: user.drivingLicenseNo,
    //           isDeleted: user.isDeleted,
    //           requestStatus: user.requestStatus,
    //           address: user.address,
    //         }))
    //       );
    //       if (response.data.length > 0) {
    //         const userId = response.data[0].id.toString(); // Convert to string for storage
    //         sessionStorage.setItem("userId", userId);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

  return (
    <div className="user-page">
      {/* <PrimaryNavBar /> */}
      <div className="col-lg-10 col-sm-10 m-auto pt-3 mb-4 content-wrapper3">
        <div>
          <div className="container-fluid rounded-4 proSec bg-secondary">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-6 col-12 text-center">
                <h5 className="text-white pt-4">Welcome</h5>
                <img src={profileIcon} alt="profileIcon" className="pb-3" />
              </div>

              <div className="col-lg-4 col-sm-6 p-4">
                <div className="">
                  <p className="text-dark">
                    {/* {userdata[0]
                      ? userdata[0].firstName
                      : "Loading..."}
                    &nbsp;
                    {userdata[0]
                      ? userdata[0].lastName
                      : "Loading..."}
                    <br />
                    {userdata[0] ? userdata[0].email : "Loading..."}
                    <br />
                    {userdata[0] ? userdata[0].address : "Loading..."} */}
                    John Doe
                    <br />
                    john.doe@example.com
                    <br />
                    123 Main St, City, Country
                    <br />
                  </p>
                </div>
                <Button
                  text="Update"
                  type="third"
                  onClick={() => {
                    history("/UpdateUserProfile", {
                      state: { userdata: userdata[0] },
                    });
                  }}
                />
              </div>
            </div>
          </div> 
        </div>
        <div className="h-auto align-items-center justify-content-center m-auto">
          <div className="col-12 rounded-4 pt-3 class1">
            {/* <div className="d-flex flex-row pb-2 ">
              <button
                className={`btn m-1 secondary`}
                // onClick={() => handleClick("My Bookings")}
                style={{
                  ...buttonStyle,
                  fontWeight: "semi-bold",
                  color: "white",
                }}
              >
                My Bookings
              </button>
              <button
                className={`btn m-1 grey`}
                // onClick={() => handleClick("Travel History")}
                style={buttonStyle}
              >
                Travel History
              </button>
              <button
                className={`btn m-1 grey`}
                // onClick={() => handleClick("Notifications")}
                style={buttonStyle}
              >
                Notifications
              </button>
            </div> */}
            <div
              className="p-2 rounded-4 ms-auto me-auto justify-content-center align-items-center"
              style={{ background: "#F1F1F1" }}
            >
              <MyOrders userId={userId} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Order