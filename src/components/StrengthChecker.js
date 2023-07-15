import React from "react";

const PasswordStrengthIndicator = ({ password = "" }) => {
  const getPasswordStrength = () => {
    if (password.length < 1) {
      return "";
    } else if (password.length < 4) {
      return "Very Weak";
    } else if (password.length < 8) {
      return "Poor";
    } else if (password.length < 12) {
      return "Medium";
    } else if (password.length < 16) {
      return "Strong";
    }
  };

  const passwordStrength = getPasswordStrength();
  if (!passwordStrength) {
    return <React.Fragment />;
  }

  return (
    <div className="password-strength">
      Strength: <span style={{ fontWeight: "bold" }}>{passwordStrength}</span>
    </div>
  );
};

export default PasswordStrengthIndicator;
