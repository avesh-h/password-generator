import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkBoxData, length) => {
    let charset = "",
      generatedPassword = "";

    const selectedOptions = checkBoxData.filter((c) => c.state);

    if (!selectedOptions.length) {
      setErrorMessage("Please select one of this option");
      setPassword("");
      return;
    }
    //for each for add what kind of chars need to in password
    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letter":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;

        case "Include Lowercase Letter":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;

        case "Include Numbers":
          charset += "0123456789";
          break;

        case "Include Symbols":
          charset += "!@#$%^&*()";
          break;

        default:
          break;
      }
    });

    //for loop for generate random password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
