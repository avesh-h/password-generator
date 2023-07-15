import "./App.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";

export default function App() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase Letter", state: false },
    { title: "Include Lowercase Letter", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCheckBoxChange = (e, i) => {
    const updatedCheckboxes = [...checkBoxData];
    updatedCheckboxes[i].state = !updatedCheckboxes[i].state;
    setCheckBoxData(updatedCheckboxes);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => console.log("Err", err));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="App">
      <div className="container">
        {/* Password text and copy */}
        {password && (
          <div className="title">
            <span>{password}</span>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {/* Character length */}
        <div className="char-div">
          <div className="char-title">
            <label>Character Length</label>
            <label>{length}</label>
          </div>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="char-input"
          />
        </div>
        {/* checkboxes */}
        <div className="checkboxes">
          {checkBoxData.map((c, i) => {
            return (
              <div key={`${c.title}-${i}`}>
                <input
                  type="checkbox"
                  checked={c.state}
                  onChange={(e) => handleCheckBoxChange(e, i)}
                />
                <span>{c.title}</span>
              </div>
            );
          })}
        </div>
        {/* strength */}
        <PasswordStrengthIndicator password={password} />

        {/* Error Handling */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* generate button */}
        <div className="generate-div">
          <button
            className="generate-btn"
            onClick={() => generatePassword(checkBoxData, length)}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}
