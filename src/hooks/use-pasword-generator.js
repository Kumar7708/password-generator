import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charSet = "",
      generatedPassword = "";
    const selectedOption = checkboxData.filter((item) => item.state);

    if (selectedOption.length === 0) {
      setErrorMessage("Select at least one option");
      setPassword("");
      return;
    }

    selectedOption.forEach((item) => {
      switch (item.title) {
        case "Include Uppercase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "0123456789";
          break;
        case "Include Symbols":
          charSet += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[index];
    }
    setPassword(generatedPassword);
    setErrorMessage("");
    return;
  };

  return { password, errorMessage, generatePassword };
};
export default usePasswordGenerator;
