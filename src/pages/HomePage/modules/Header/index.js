import { useState } from "react";
import { StyledHeader } from "./index.styled";
import { toast } from "react-toastify";

const Header = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => setSearch(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") toast.warn("You're searching for " + search);
  };
  return (
    <StyledHeader>
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        />
      </div>
    </StyledHeader>
  );
};

export default Header;
