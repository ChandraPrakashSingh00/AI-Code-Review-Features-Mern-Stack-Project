import React from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ setSidebarOpen, darkMode, setDarkMode }) => {
  return (
    <nav className={`flex justify-between items-center p-4 ${darkMode ? "bg-gray-900" : "bg-white"} bg-opacity-50 backdrop-blur-md shadow-lg fixed w-full z-50`}>
      <button onClick={() => setSidebarOpen(true)} className="text-2xl hover:text-cyan-400 transition-all">
        <FaBars />
      </button>
      <h1 className="text-2xl font-extrabold neon-text glow-text tracking-wide">
        ⚡ AI Code Review Tool
      </h1>
      <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-cyan-500 hover:to-blue-600 transition text-white">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
