
import { config } from 'dotenv';
config({ path: '.env.local' });
import { generateTTS } from './src/lib/elevenlabs-ai';
import * as fs from 'fs';

async function testTTS() {
    console.log("Testing ElevenLabs TTS...");
    const key = process.env.ELEVENLABS_API_KEY;

    // Write debug info to file
    const safeKeyStart = key ? key.substring(0, 4) : 'N/A';
    fs.writeFileSync('debug-key.txt', `Key present: ${!!key}\nLength: ${key ? key.length : 0}\nStart: ${safeKeyStart}`);

    console.log(`Debug info written to debug-key.txt`);

    try {
        const text = "Hello, this is a test of the ElevenLabs integration with a specific voice.";
        const voiceId = "IKne3meq5aSn9XLyUdCD"; // Charlie
        console.log(`Testing with voice ID: ${voiceId}`);
        const audioUrl = await generateTTS(text, voiceId);

        console.log("Success!");
        console.log("Audio URL length:", audioUrl.length);
    } catch (error: any) {
        console.error("Test failed:", error.message);
    }
}

testTTS();
