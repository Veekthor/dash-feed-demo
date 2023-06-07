import { HomePageContainer } from "./index.styled";
import Feed from "./modules/Feed";
import Header from "./modules/Header";
import SidePanel from "./modules/SidePanel";

const HomePage = () => {
  return (
    <>
      <Header />
      <HomePageContainer>
        <SidePanel />
        <Feed />
      </HomePageContainer>
    </>
  );
};

export default HomePage;
