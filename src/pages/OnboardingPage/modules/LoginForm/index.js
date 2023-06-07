import { useContext, useEffect, useState } from "react";
import { FormContainer, FormFooter } from "./index.styled";
import { apiCall } from "../../../../utils/api";
import { useMatch, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext";
import { toast } from "react-toastify";
import { StyledButton } from "../../../../components/styles/Button.styled";
import TextInput from "../TextInput";

const LoginForm = () => {
  const isLoginPage = useMatch("/login");
  const navigate = useNavigate();

  const loginInputState = {
    email: "",
    password: "",
  };
  const registerInputState = {
    email: "",
    firstName: "",
    lastName: "",
    gradYear: "",
  };
  const inputState = isLoginPage ? loginInputState : registerInputState;

  const loginInputProps = [
    {
      label: "Enter your university email",
      type: "email",
      required: true,
      name: "email",
      placeholder: "exampl@kumail.com",
    },
    {
      label: "Enter a password",
      type: "password",
      required: true,
      name: "password",
      placeholder: "Enter your password",
    },
  ];

  const registerInputProps = [
    {
      label: "Enter your university email",
      type: "email",
      name: "email",
      placeholder: "exampl@kumail.com",
    },
    {
      label: "Enter your First Name",
      type: "text",
      name: "firstName",
      placeholder: "Ex. John",
    },
    {
      label: "Enter your Last Name",
      type: "text",
      name: "lastName",
      placeholder: "Ex. Granit",
    },
    {
      label: "Enter your Graduation Year",
      type: "number",
      min: 0,
      max: new Date().getFullYear() + 10,
      name: "gradYear",
      placeholder: "2026",
    },
  ];

  const inputProps = isLoginPage ? loginInputProps : registerInputProps;
  const [userInputs, setInputs] = useState(inputState);
  const [isLoading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    if (!!user) navigate("/feed");
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoginPage) return navigate("/login");
    setLoading(true);
    const path = "/auth/login";
    const body = {
      university_email: userInputs.email,
      password: userInputs.password,
    };
    const callback = (err, data) => {
      setLoading(false);
      if (data) {
        toast.success(data.response_message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        navigate("/feed");
        setUser(data.user);
      }
      if (err) {
        toast.error(err.response_message || "Something went wrong!");
      }
    };
    apiCall({ path, body, method: "POST", callback });
  };

  return (
    <FormContainer>
      <div>
        <h2>
          {!!isLoginPage ? "Hey, welcome back!" : "Join and discover more"}
        </h2>
        {!!isLoginPage && <p>Continue enjoying amazing discoveries</p>}
      </div>
      <form onSubmit={handleSubmit}>
        {inputProps.map((props) => (
          <TextInput
            key={props.name}
            {...props}
            id={props.name}
            value={userInputs[props.name]}
            onChange={handleChange}
            disabled={isLoading}
          />
        ))}
        <StyledButton data-testid="loginBtn" type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : isLoginPage ? "Login" : "Next"}
        </StyledButton>
      </form>
      <FormFooter>
        {!!isLoginPage ? (
          <>
            <p>
              Don't have an account ?{" "}
              <span className="text-primary">Sign Up</span>
            </p>
            <p className="text-primary">Forgot your password ?</p>
          </>
        ) : (
          <p>
            Already have an account ?{" "}
            <span className="text-primary">Log In</span>
          </p>
        )}
        <p>
          By clicking on 'Login' you've agreed to the
          <br />
          <span className="text-primary">Terms of Use</span> and{" "}
          <span className="text-primary">Privacy Policy.</span>
        </p>
      </FormFooter>
    </FormContainer>
  );
};

export default LoginForm;
