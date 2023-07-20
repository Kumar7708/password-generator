import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-pasword-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: true },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="container">
      {/* password with copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}

      {/* character length */}
      <div className="characterLen">
        <span>
          <label>Character Length </label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((item, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={item.state}
                onChange={() => handleCheckboxChange(index)}
              />
              <label>{item.title}</label>
            </div>
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* error handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* password */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
}
