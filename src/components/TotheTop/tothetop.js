import { useState } from "react";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

function ToTheTop() {
  const [showButton, setShowButton] = useState(false);

  window.onscroll = function () {
    if (window.scrollY >= 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {showButton && (
        <Fab size="medium" onClick={handleClick}>
          <KeyboardArrowUp />
        </Fab>
      )}
    </div>
  );
}

export default ToTheTop;