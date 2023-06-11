import React from "react";

const tile = (str) => {
  const tileStyle = {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "max-content",
    height: "max-content",

    color: "black",
    backgroundColor: rgb(240, 240, 240),
    borderWidth: "1px 3px 3px 1px",
    borderStyle: "solid",
    borderColor: "black",

    padding: "5px",
    cursor: "pointer",
  };
  return <div className="tile"></div>;
};

export default tile;
