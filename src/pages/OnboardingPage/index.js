import { StyledOnboardingPage } from "./index.styled";
import LoginForm from "./modules/LoginForm";

const OnboardingPage = () => {
  return (
    <StyledOnboardingPage>
      <p>
        A Safe Place for Students to Connect with Each Other,
        <br />
        Engage in Transactions, and Succeed During their
        <br /> College Career.
      </p>
      <LoginForm />
    </StyledOnboardingPage>
  );
};

export default OnboardingPage;
