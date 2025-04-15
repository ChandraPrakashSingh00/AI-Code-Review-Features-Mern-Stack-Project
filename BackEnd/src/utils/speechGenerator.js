const gTTS = require('gtts');
const path = require('path');
const fs = require('fs');

exports.generateSpeech = async (text, filename) => {
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    const gtts = new gTTS(text, 'en');

    return new Promise((resolve, reject) => {
        gtts.save(filePath, (err) => {
            if (err) return reject(err);
            resolve(`/uploads/${filename}`); // Return relative URL
        });
    });
};
