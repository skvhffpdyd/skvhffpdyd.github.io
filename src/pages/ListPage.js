import { Routes, Route } from "react-router-dom";
import Team from "../components/Teams/team";
import Members from "../components/Members/index";
import TeamDetail from "../components/TeamDetail/teamDetail";
import Contest from "../components/Contest/contest";
import ChatSetting from "../components/ChatSetting/chatSetting";
function ListPage() {
  return (
  <div>
    <Routes>
      <Route path="team" element={<><Team/><ChatSetting/></>}></Route>
      <Route path="team/:teamId/" element={<><TeamDetail /><ChatSetting/></>}></Route>  
      <Route path="members" element={<><Members/><ChatSetting/></>}/>        
      <Route path="contest" element={<><Contest/><ChatSetting/></>}/>
    </Routes>
  </div>
  )
}

export default ListPage