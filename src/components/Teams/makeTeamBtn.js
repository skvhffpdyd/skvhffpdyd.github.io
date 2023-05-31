import { IconButton } from "@mui/material";
import React from "react";
import CreateIcon from "@mui/icons-material/Create";
function MakeTeam({ makeTeam }) {
  return (
    <div className="mkBtn">
    <IconButton
      onClick={makeTeam}
      size="big"
      sx={{
        position: "fixed",
        bottom: "80px",
        right: "25px",
        backgroundColor: "#cccccc",
        boxShadow: "0px 2px 5px gray"
      }}
    >
      <CreateIcon />
    </IconButton>
    </div>
  );
}
export default MakeTeam;
