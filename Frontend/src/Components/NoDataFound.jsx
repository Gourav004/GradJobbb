import nodata from "../assets/nodata.png";

import React from "react";

function NoDataFound() {
  return (
    <div>
      <img src={nodata} alt="No Data Found" />
    </div>
  );
}

export default NoDataFound;
