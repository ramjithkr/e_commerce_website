import { useState, useEffect } from "react";
import { Sun, Moon } from 'lucide-react';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply the theme to the document
    document.documentElement.setAttribute('data-theme', isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
      <label className="swap swap-rotate cursor-pointer">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller"
          checked={isDarkMode}
          onChange={handleToggle}
        />

        {/* Sun icon */}
        <Sun
          className={`swap-off h-8 w-8 fill-current ${!isDarkMode ? "block" : "hidden"}`}
        />

        {/* Moon icon */}
        <Moon
          className={`swap-on h-8 w-8 fill-current ${isDarkMode ? "block" : "hidden"}`}
        />
      </label>
    </div>
  );
};

export default DarkMode;