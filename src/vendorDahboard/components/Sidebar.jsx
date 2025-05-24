import React from "react";

const Sidebar = ({
  showFirmHandler,
  showAddProductHandler,
  showAllProductsHandler,
  showFirmTitle,
}) => {
  return (
    <div className="sidebarSection">
      <ul>
        {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : ""}

        <li onClick={showAddProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Product</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default Sidebar;
