const aiService = require("../services/ai.service");
const gtts = require("node-gtts")("en");
const path = require("path");

async function getReview(req, res) {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "Code is required" });

        const response = await aiService.analyzeCode(code);
        res.json({ review: response.review || "No response from AI" });
    } catch (error) {
        console.error("Error analyzing code:", error);
        res.status(500).json({ error: "Error analyzing code" });
    }
}

function generateSpeech(text, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "../public/audio", filename);
        gtts.save(filePath, text, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(`/audio/${filename}`);
            }
        });
    });
}

async function speakReview(req, res) {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "Code is required" });

        const review = await aiService.analyzeCode(code);
        const speechText = review.review || "No speech review generated";

        const filename = `speech_${Date.now()}.mp3`;
        const audioPath = await generateSpeech(speechText, filename);

        res.json({ audio: audioPath });
    } catch (error) {
        console.error("Error generating speech review:", error);
        res.status(500).json({ error: "Error generating speech review" });
    }
}

async function humanizeSpeech(req, res) {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const humanizedText = `In simple terms: ${text}`;
        const filename = `humanized_${Date.now()}.mp3`;
        const audioPath = await generateSpeech(humanizedText, filename);

        res.json({ audio: audioPath });
    } catch (error) {
        console.error("Error humanizing speech:", error);
        res.status(500).json({ error: "Error humanizing speech" });
    }
}

async function shortenReview(req, res) {
    try {
        const { text, code } = req.body;
        if (!text && !code) return res.status(400).json({ error: "Text or Code is required" });

        let inputText = text;
        if (code && !text) {
            const response = await aiService.analyzeCode(code);
            inputText = response.review || "No review available";
        }

        const shortenedText = inputText.substring(0, 100) + "...";

        res.json({ shortenedText });
    } catch (error) {
        console.error("Error shortening review:", error);
        res.status(500).json({ error: "Error shortening review" });
    }
}

async function elongateReview(req, res) {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        res.json({ elongatedText: `${text}... Adding more insights for clarity.` });
    } catch (error) {
        console.error("Error elongating review:", error);
        res.status(500).json({ error: "Error elongating review" });
    }
}

async function securityCheck(req, res) {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "Code is required" });

        const prompt = `Analyze the security of the following code:\n\n${code}`;
        const response = await aiService.analyzeCode(prompt);

        res.json({ securityIssues: response.review || "No security issues found." });
    } catch (error) {
        console.error("Error checking security vulnerabilities:", error);
        res.status(500).json({ error: "Error checking security vulnerabilities" });
    }
}

async function performanceBoost(req, res) {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "Code is required" });

        const prompt = `Suggest performance improvements for the following code:\n\n${code}`;
        const response = await aiService.analyzeCode(prompt);

        res.json({ performanceSuggestions: response.review || "No performance suggestions." });
    } catch (error) {
        console.error("Error suggesting performance improvements:", error);
        res.status(500).json({ error: "Error suggesting performance improvements" });
    }
}

module.exports = {
    getReview,
    speakReview,
    humanizeSpeech,
    shortenReview,
    elongateReview,
    securityCheck,
    performanceBoost,
};
