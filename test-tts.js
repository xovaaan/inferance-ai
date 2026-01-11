require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function testVoiceRSS() {
    console.log('🧪 Testing VoiceRSS API...\n');

    if (!process.env.VOICERSS_API_KEY) {
        console.error("❌ VOICERSS_API_KEY is missing from .env.local");
        return;
    }
    console.log(`✅ Found API Key: ${process.env.VOICERSS_API_KEY.substring(0, 5)}...`);

    const voices = [
        { name: 'Austin', lang: 'en-us', voice: 'John', gender: 'Male' },
        { name: 'Claire', lang: 'en-au', voice: 'Zoe', gender: 'Female' }
    ];

    for (const v of voices) {
        console.log(`\n🎧 Generating ${v.name} (${v.voice}, ${v.lang})...`);
        const text = `Hello, I am ${v.name}. I am a ${v.gender} voice provided by VoiceRSS.`;

        try {
            const url = `http://api.voicerss.org/?key=${process.env.VOICERSS_API_KEY}&hl=${v.lang}&v=${v.voice}&src=${encodeURIComponent(text)}&r=0&c=mp3&f=44khz_16bit_stereo`;
            const response = await fetch(url);

            if (!response.ok) {
                console.log(`   ❌ Failed: ${response.status}`);
                continue;
            }

            const buffer = await response.arrayBuffer();
            const stringData = Buffer.from(buffer).toString();

            if (stringData.startsWith('ERROR')) {
                console.log(`   ❌ API Error: ${stringData}`);
            } else {
                const filePath = `test-voicerss-${v.name.toLowerCase()}.mp3`;
                fs.writeFileSync(filePath, Buffer.from(buffer));
                console.log(`   ✅ Success! Saved to ${filePath} (${buffer.byteLength} bytes)`);
            }

        } catch (e) {
            console.log(`   ❌ Error: ${e.message}`);
        }
    }
}

testVoiceRSS();
