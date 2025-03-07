import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    alert("Password Copied!");
  };

  const refreshPassword = () => {
    setPassword("");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center font-mono">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/websiteBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-center bg-opacity-60 rounded-lg w-150 l-100 p-6 text-white shadow-lg">
        <p className="text-5xl font-bold mb-10 pb-2" >Password Generator</p>

        <div className="flex items-center bg-white text-black rounded-lg p-2">
          <input
            type="text"
            name="password"
            value={password}
            placeholder="password"
            ref={passwordRef}
            className="outline-none w-full px-2 bg-transparent"
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="text-black p-3 rounded-lg"
          >
            copy
          </button>
        </div>

        <div className="flex items-center justify-between mt-8 space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer w-24"
            />
            <label className="text-lg">{length}</label>
          </div>

          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <span>Numbers</span>
          </label>

          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <span>Characters</span>
          </label>

          <button
            onClick={refreshPassword}
            className="bg-white text-black px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
