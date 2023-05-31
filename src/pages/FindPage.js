import { Routes, Route } from "react-router-dom";
import Find from "../components/Find/find";

function FindPage() {
  return (
    <div>
      <Routes>
        <Route path="recommend/*" element={<Find />}></Route>
      </Routes>
    </div>
  );
}

export default FindPage;
