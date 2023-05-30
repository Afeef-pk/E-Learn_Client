import React from "react";
import UserHome from "../../components/User/UserHome";
import NavBar from "../../components/User/NavBar";
import Footer from "../../components/User/Footer";
function UserHomePage() {
  return (
    <>
      <NavBar />
      <UserHome />
      <Footer/>
    </>
  );
}

export default UserHomePage;
