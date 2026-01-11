
export const VOICES = [
    // Female Voices
    { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'Female' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'Female' },
    { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', gender: 'Female' },
    { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', gender: 'Female' },
    { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', gender: 'Female' },
    { id: 'cgSgspJ2msm6clMCkdW9', name: 'Jessica', gender: 'Female' },
    { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', gender: 'Female' },
    { id: 'zrHiDhphv9ZnVXBqCLjf', name: 'Mimi', gender: 'Female' },
    { id: 'LcfcDJNUP1GQjkzn1xUU', name: 'Emily', gender: 'Female' },
    { id: 'piTKgcLEGmPE4e6mEKli', name: 'Nicole', gender: 'Female' },

    // Male Voices
    { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'Male' },
    { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', gender: 'Male' },
    { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', gender: 'Male' },
    { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum', gender: 'Male' },
    { id: 'SOYHLrjzK2X1ezoPC6cr', name: 'Harry', gender: 'Male' },
    { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'Male' },
    { id: 'bIHbv24MWmeRgasZH58o', name: 'Will', gender: 'Male' },
    { id: 'cjVigY5qzO86Huf0OWal', name: 'Eric', gender: 'Male' },
    { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris', gender: 'Male' },
    { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', gender: 'Male' },
];


// Short silent MP3 for mock purposes (valid 1s silence)
const MOCK_AUDIO_URL = "data:audio/mp3;base64,//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
// Actually, let's use a slightly more robust one just in case the previous one was truncated or weird.
// This is a very short silent frame.
const MOCK_AUDIO_VALID = "data:audio/mp3;base64,//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

// Let's try a proven 1-second silence base64
// Local mock file (most reliable for CORS and browser support)
const VALID_SILENT_MP3 = "/mock-audio.mp3";

export async function generateTTS(text: string, voiceId?: string): Promise<string> {
    try {
        const apiKey = process.env.ELEVENLABS_API_KEY
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY is not set in environment variables")
        }

        const selectedVoiceId = voiceId || '21m00Tcm4TlvDq8ikWAM' // Default to Rachel
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`

        console.log(`[ElevenLabs] Requesting TTS for: "${text.substring(0, 30)}..." using voice ${selectedVoiceId}`)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_turbo_v2_5',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5,
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }))
            console.error(`[ElevenLabs] API Error: ${response.status}`, errorData)

            // Provide localized advice for common errors
            if (response.status === 401 && errorData.detail?.status === 'detected_unusual_activity') {
                throw new Error("ElevenLabs Blocked: Unusual activity detected on your Free Tier account (VPN/Proxy usage). Please use a different network or a Paid Plan.")
            }

            throw new Error(`ElevenLabs API error: ${response.status} - ${errorData.detail?.message || JSON.stringify(errorData)}`)
        }

        const contentType = response.headers.get('content-type') || 'audio/mpeg'
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64 = buffer.toString('base64')
        const audioUrl = `data:${contentType};base64,${base64}`

        return audioUrl
    } catch (error) {
        console.error("Error generating ElevenLabs TTS:", error)
        throw error
    }
}

export async function generateSTS(audioBlob: Blob, voiceId: string): Promise<string> {
    try {
        const apiKey = process.env.ELEVENLABS_API_KEY
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY is not set in environment variables")
        }

        const url = `https://api.elevenlabs.io/v1/speech-to-speech/${voiceId}`
        console.log(`[ElevenLabs] Requesting STS for voice ${voiceId}`)

        const formData = new FormData()
        formData.append('audio', audioBlob, 'audio.mp3')
        formData.append('model_id', 'eleven_english_sts_v2')
        formData.append('voice_settings', JSON.stringify({
            stability: 0.5,
            similarity_boost: 0.5,
        }))

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
            },
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }))
            console.error(`[ElevenLabs] STS API Error: ${response.status}`, errorData)
            throw new Error(`ElevenLabs STS API error: ${response.status} - ${errorData.detail?.message || JSON.stringify(errorData)}`)
        }

        const contentType = response.headers.get('content-type') || 'audio/mpeg'
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64 = buffer.toString('base64')
        const audioUrl = `data:${contentType};base64,${base64}`

        return audioUrl
    } catch (error) {
        console.error("Error generating ElevenLabs STS:", error)
        throw error
    }
}

export async function createVoiceClone(name: string, audioFiles: File[]): Promise<string> {
    try {
        const apiKey = process.env.ELEVENLABS_API_KEY
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY is not set in environment variables")
        }

        const url = `https://api.elevenlabs.io/v1/voices/add`
        console.log(`[ElevenLabs] Creating voice clone: "${name}" with ${audioFiles.length} files`)

        const formData = new FormData()
        formData.append('name', name)
        audioFiles.forEach((file) => {
            formData.append('files', file)
        })
        formData.append('description', 'Cloned voice via Antigravity AI')

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
            },
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }))
            console.error(`[ElevenLabs] Voice Clone API Error: ${response.status}`, errorData)
            throw new Error(`ElevenLabs Voice Clone API error: ${response.status} - ${errorData.detail?.message || JSON.stringify(errorData)}`)
        }

        const data = await response.json()
        return data.voice_id
    } catch (error) {
        console.error("Error creating voice clone:", error)
        throw error
    }
}
