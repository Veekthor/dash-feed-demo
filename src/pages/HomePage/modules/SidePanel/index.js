import { useContext } from "react";
import { SidePanelNav } from "./index.styled";
import { AuthContext } from "../../../../context/authContext";

const SidePanel = () => {
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setUser(null);
  };
  return (
    <SidePanelNav>
      <ul>
        <li className="active">Home</li>
        <li>My Profile</li>
        <li>Connections</li>
        <li>Messages</li>
        <li>Settings</li>
        <li role="button" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </SidePanelNav>
  );
};

export default SidePanel;
