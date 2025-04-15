import axios from "axios";

const API_URL = "http://localhost:3000/ai"; 
const BASE_URL = "http://localhost:3000"; 

export async function fetchAIResponse(endpoint, inputType, inputValue) {
  try {
    const textBasedEndpoints = ["shorten-review", "humanize-speech", "elongate-review"];
    
    const isTextRequest = textBasedEndpoints.includes(endpoint);
    const payload = isTextRequest 
      ? { text: inputValue }
      : { code: inputValue };

    const response = await axios.post(`${API_URL}/${endpoint}`, payload);

    if (response.data.audio) {
      const audioUrl = `${BASE_URL}${response.data.audio}`;
      const audio = new Audio(audioUrl);

      audio.addEventListener('canplaythrough', () => {
        audio.play().then(() => {
          console.log("🔊 Playing Audio Response...");
        }).catch((err) => {
          console.error("Audio Play Error:", err);
          alert("Tap to play audio!");
        });
      });

      return "🔊 Playing Audio Response...";
    }

    return (
      response.data.review || 
      response.data.humanizedText || 
      response.data.shortenedText || 
      response.data.elongatedText || 
      response.data.securityIssues || 
      response.data.performanceSuggestions || 
      "No response from AI"
    );
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return "⚠️ Error fetching AI response";
  }
}
