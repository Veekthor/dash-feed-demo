import { InputContainer } from "./index.styled";

const TextInput = ({ label, ...props }) => {
  return (
    <InputContainer>
      <label htmlFor={props.id}>{label}:</label>
      <input {...props} />
    </InputContainer>
  );
};

export default TextInput;
