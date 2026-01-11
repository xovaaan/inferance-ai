require('dotenv').config({ path: '.env.local' })
const fs = require('fs')

async function testTTS() {
    console.log('🧪 Debugging Hugging Face TTS (facebook/mms-tts-eng)...\n')

    if (!process.env.HUGGINGFACE_API_KEY) {
        console.log('❌ Error: HUGGINGFACE_API_KEY not found in .env.local')
        return
    }

    const model = 'facebook/mms-tts-eng'
    const url = `https://api-inference.huggingface.co/models/${model}`

    try {
        console.log('Sending request to Hugging Face...')
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
            method: "POST",
            body: JSON.stringify({ inputs: 'This is a test of the Text-to-Speech system.' }),
        })

        console.log(`Response Status: ${response.status} ${response.statusText}`)
        console.log(`Content-Type: ${response.headers.get('content-type')}`)

        if (!response.ok) {
            const errorText = await response.text()
            console.log(`❌ Error Details: ${errorText}`)
            return
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        console.log('✅ Response received!')
        console.log('   Audio size:', Math.round(buffer.length / 1024), 'KB')

        const contentType = response.headers.get('content-type') || 'audio/mpeg'
        fs.writeFileSync('debug-tts.output', buffer)
        console.log(`   Saved to: debug-tts.output (Detected Type: ${contentType})`)

    } catch (error) {
        console.log('❌ Exception:', error.message)
    }
}

testTTS()
