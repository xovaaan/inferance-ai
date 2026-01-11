
require('dotenv').config({ path: '.env.local' });
const { generateTTS } = require('./src/lib/elevenlabs-ai');

async function testTTS() {
    console.log("Testing ElevenLabs TTS...");
    try {
        const text = "Hello, this is a test of the ElevenLabs integration.";
        const audioUrl = await generateTTS(text);

        console.log("Success!");
        console.log("Audio URL length:", audioUrl.length);
        console.log("Audio URL start:", audioUrl.substring(0, 50));
    } catch (error) {
        console.error("Test failed:", error);
    }
}

testTTS();
