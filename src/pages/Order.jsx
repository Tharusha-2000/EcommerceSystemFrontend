import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import './Order.css';
import profileIcon from "../utils/Images/iconamoon_profile-circle-fill.png";
import Button from '../components/Button'; // Adjust the import path as necessary
import MyOrders from '../components/MyOrders'; // Adjust the import path as necessary
import UpdateProfile from '../components/UpdateProfile';

const Order = () => {
    const [divWidth, setDivWidth] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const userId = 3;
    const [userdata, setUserdata] = useState([
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        contactNo: "1234567890",
        userName: "johndoe",
        address: "123 Main St, City, Country"
      }
    ]);
    console.log(userdata);
    console.log(userdata[0].address);
    
    const buttonStyle = {
      backgroundColor: "rgba(217, 217, 217, 1)",
      color: "black", 
    };

    useEffect(() => {

      function handleResize() {
        const width = document.getElementById("getWidth")?.offsetWidth;
        setDivWidth(width || 0);
      }

      handleResize(); 
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
      
    }, []);


  const handleUpdate = (updatedData) => {
    setUserdata(updatedData); // Update state with new data
    console.log("Updated User Data:", updatedData); // Debugging
  };

   

  return (
    <div className="user-page">
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
                     {userdata ? (
                            <>
                              {userdata[0].firstName} &nbsp; {userdata[0].lastName}
                              <br />
                              {userdata[0].email}
                              <br />
                              {userdata[0].address}
                            </>
                          ) : (
                            "Loading..."
                          )}
                   </p>
                </div>
                <UpdateProfile
                     open={openDialog}
                     onClose={() => setOpenDialog(false)} // Close dialog
                     userdata={userdata}
                     onUpdate={handleUpdate}
                />

                <Button
                  text="Update"
                  type="third"
                   onClick={() => setOpenDialog(true)}
                />
              </div>
            </div>
          </div> 
        </div>
        <div className="h-auto align-items-center justify-content-center m-auto">
          <div className="col-12 rounded-4 pt-3 class1">
            <div
              className="p-2 rounded-4 ms-auto me-auto justify-content-center align-items-center"
              style={{ background: "#F1F1F1" }}
            >
              {/* <MyOrders userId={userId} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order