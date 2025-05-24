import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowFirmTitle(false);

    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setShowLogout(true);
    }
  }, []);

  const LogoutHandler = () => {
    confirm("are you sure to Logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");

    setShowLogout(false);
    setShowFirmTitle(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };
  const showFirmHandler = () => {
    if (showLogout) {
      setShowFirm(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);

    } else {
      alert("plese login")
      setShowLogin(true)
    }

  };
  const showAddProductHandler = () => {
    if (showLogout) {
      setShowAddProduct(true);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("please login")
      setShowLogin(true)
    }
  };

  const showWelcomeHandler = () => {
    setShowAddProduct(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      setShowAddProduct(false);
      setShowFirm(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    } else {
      alert("please login")
      setShowLogin(true)

    }
  };
  return (
    <>
      <section className="landingSection">
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          LogoutHandler={LogoutHandler}
        />
        <div className="collectionSection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showAddProductHandler={showAddProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogout && <AddFirm />}
          {showAddProduct && showLogout && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout && <AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
