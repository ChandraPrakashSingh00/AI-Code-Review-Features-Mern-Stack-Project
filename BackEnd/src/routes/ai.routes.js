const express = require("express");
const {
    getReview,
    speakReview,
    humanizeSpeech,
    shortenReview,
    elongateReview,
    securityCheck,
    performanceBoost
} = require("../controllers/ai.controller");

const router = express.Router();

router.post("/get-review", getReview);
router.post("/speak-review", speakReview);
router.post("/humanize-speech", humanizeSpeech);
router.post("/shorten-review", shortenReview);
router.post("/elongate-review", elongateReview);
router.post("/security-check", securityCheck);
router.post("/performance-boost", performanceBoost);

module.exports = router;
