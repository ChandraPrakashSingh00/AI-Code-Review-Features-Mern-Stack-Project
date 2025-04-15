const generateContent = require("../utils/generateContent");

async function analyzeCode(code) {
    try {
        const prompt = `Review the following code:\n\n${code}\n\nProvide feedback.`;
        const response = await generateContent(prompt);

        console.log("AI RAW Response ===>", response); // debugging

        return { review: response };  // direct return karo
    } catch (error) {
        console.error("AI analysis failed:", error);
        throw new Error("AI analysis failed");
    }
}

module.exports = { analyzeCode };
