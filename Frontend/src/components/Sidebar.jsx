import React from "react";
import {
  FaTimes,
  FaMicrophone,
  FaVolumeUp,
  FaCompress,
  FaExpand,
  FaShieldAlt,
  FaBolt,
  FaCode,
} from "react-icons/fa";

const Sidebar = ({ setSidebarOpen, handleAIRequest }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#0f0f0f80] to-[#1a1a1a80] backdrop-blur-xl border-r border-[#ffffff20] shadow-[0_0_20px_#00f2ff50] z-50 p-5 rounded-r-3xl animate-slideIn">
      
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 text-3xl text-gray-300 hover:text-red-500 transition-all duration-300"
        onClick={() => setSidebarOpen(false)}
      >
        <FaTimes />
      </button>

      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-400 tracking-wider glow-text">
        ⚙️ AI Lab
      </h2>

      {/* AI Buttons */}
      <div className="flex flex-col gap-4">
        {[
          { icon: <FaCode />, label: "Code Review", color: "from-pink-500 to-purple-700", type: "code-review" },
          { icon: <FaMicrophone />, label: "Speak", color: "from-blue-500 to-blue-800", type: "speak-review" },
          { icon: <FaVolumeUp />, label: "Humanize", color: "from-purple-500 to-indigo-700", type: "humanize-speech" },
          { icon: <FaCompress />, label: "Shorten", color: "from-orange-500 to-red-600", type: "shorten-review" },
          { icon: <FaExpand />, label: "Expand", color: "from-green-500 to-teal-700", type: "elongate-review" },
          { icon: <FaShieldAlt />, label: "Security Check", color: "from-red-500 to-rose-700", type: "security-check" },
          { icon: <FaBolt />, label: "Performance Boost", color: "from-yellow-500 to-green-600", type: "performance-boost" },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => handleAIRequest(item.type, "text")}
            className={`bg-gradient-to-r ${item.color} p-3 rounded-xl flex items-center gap-3 text-white text-lg font-medium hover:scale-105 hover:shadow-[0_0_20px_#00f2ff80] transition-all duration-300`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
