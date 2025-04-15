import { fetchAIResponse } from "../api/fetchAIResponse";

const handleAIRequest = async (endpoint, inputType = "code") => {
  const response = await fetchAIResponse(endpoint, inputType, inputValue); // inputValue user ka input hai (code/text)

  setOutput(response.message); // Output ko show karne ke liye

  if (response.audioUrl) {
    const audio = new Audio(response.audioUrl);
    audio.play().catch((err) => {
      console.error("Audio Play Error:", err);
      alert("Tap to play audio!");
    });
  }
};
