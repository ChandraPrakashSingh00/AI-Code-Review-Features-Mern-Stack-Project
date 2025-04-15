import React, { useState } from "react";
import { motion } from "framer-motion";
import MonacoEditor from "@monaco-editor/react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { fetchAIResponse } from "./utils/api";

function App() {
  const [code, setCode] = useState("function sum() {\n  return 1 + 1;\n}");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleAIRequest(endpoint, inputType = "code") {
    setLoading(true);
    setSidebarOpen(false); // Sidebar automatically close hoga
    const response = await fetchAIResponse(endpoint, inputType, code);
    setReview(response);
    setLoading(false);
  }

  return (
    <div className={`min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Navbar setSidebarOpen={setSidebarOpen} darkMode={darkMode} setDarkMode={setDarkMode} />
      {sidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen} handleAIRequest={handleAIRequest} />}

      <motion.div className="p-5 pt-28 w-full max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-cyan-400 text-center mb-8 uppercase drop-shadow-lg animate-pulse">
          🚀 AI CODE REVIEW TOOL
        </h1>

        <div className="glassmorphism p-5 rounded-xl shadow-lg border border-cyan-500 backdrop-blur-md">
          <MonacoEditor
            height="350px"
            language="javascript"
            theme={darkMode ? "vs-dark" : "light"}
            value={code}
            onChange={setCode}
            options={{ fontSize: 16, minimap: { enabled: false } }}
          />
        </div>

        <motion.button
          onClick={() => handleAIRequest("get-review")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all p-3 rounded-lg mt-5 shadow-md flex items-center gap-2 text-white font-bold"
          whileHover={{ scale: 1.1 }}
        >
          🚀 Review Code
        </motion.button>

        <div className="glassmorphism p-5 rounded-xl shadow-lg mt-5 border border-cyan-500 backdrop-blur-md">
          <Markdown rehypePlugins={[rehypeHighlight]} className="text-lg leading-relaxed">
            {review || "🤖 AI is analyzing your code..."}
          </Markdown>
        </div>
      </motion.div>
    </div>
  );
}

export default App;