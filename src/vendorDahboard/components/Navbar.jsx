import React from "react";

const Navbar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogout,
  LogoutHandler,
}) => {
  const firmName = localStorage.getItem("firmName");
  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className="firmName">
        <h2>Firmname:{firmName}</h2>
      </div>
      <div className="userAuth">
        {!showLogout ? (
          <>
            <span onClick={showLoginHandler}> Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={LogoutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
