import React, { useState } from "react";
import { API_URL } from "../../Data/apiPath";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const firmHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");

      if (!loginToken) {
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmname", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      if (file) {
        formData.append("image", file);
      }

      category.forEach((value) => formData.append("category", value));
      region.forEach((value) => formData.append("region", value));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: loginToken,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm Added Successfully");
      } else if (data.message === "vendor can have only one firm") {
        alert("firm Exists. only 1 firm can be added");
      } else {
        alert("failed to add firm");
      }
      console.log("this is firm id", data.firmId);

      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);
    } catch (error) {
      console.error("Failed to add firm", error);
      alert("Failed to add firm");
    }
  };

  return (
    <div className="firmSection">
      <form
        className="authForm"
        onSubmit={firmHandleSubmit}
        encType="multipart/form-data"
      >
        <h2>Add Firm</h2>
        <label>ShopName</label>
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />

        <label>Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="check-inp">
          <label>Category</label>
          <div className="inputContainer">
            <div className="checkbox-container">
              <label>Veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                value="veg"
                onChange={handleCategoryChange}
              />

              <label>Non-Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div />
          </div>
        </div>

        <div className="check-inp">
          <label>Region</label>
          <div className="inputContainer">
            <div className="checkbox-container">
              <label>South</label>
              <input
                type="checkbox"
                value="south"
                checked={region.includes("south")}
                onChange={handleRegionChange}
              />
              <label>North</label>
              <input
                type="checkbox"
                value="north"
                checked={region.includes("north")}
                onChange={handleRegionChange}
              />
              <label>chinese</label>
              <input
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
              <label>Bakery</label>
              <input
                type="checkbox"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
            <div />
          </div>
        </div>

        <label>Offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <label>Image</label>
        <input type="file" name="image" onChange={handleImageUpload} />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddFirm;
