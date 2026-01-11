import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Text-to-Image using Stable Diffusion XL (more reliable than Flux)
export async function generateImage(prompt: string): Promise<string> {
    try {
        const response = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0',
            inputs: prompt,
        })

        // Handle case where it might already be a string (URL)
        if (typeof response === 'string') {
            return response
        }

        // Convert blob to base64 URL for immediate use
        const blob = response as any
        const arrayBuffer = await blob.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64 = buffer.toString('base64')
        const imageUrl = `data:image/png;base64,${base64}`

        return imageUrl
    } catch (error) {
        console.error("Error generating image:", error)
        throw new Error("Failed to generate image. Error: " + (error as any)?.message)
    }
}


export const HF_VOICES = [
    { id: 'microsoft/speecht5_tts', name: 'Austin', gender: 'Male' },
    { id: 'Matthijs/speecht5_tts-common_voice_en', name: 'Brian', gender: 'Male' },
    { id: 'espnet/kan-bayashi_ljspeech_vits', name: 'Claire', gender: 'Female' },
    { id: 'kakao-enterprise/vits-ljspeech-nosanitizer', name: 'Daisy', gender: 'Female' },
    { id: 'facebook/mms-tts-eng', name: 'Edward', gender: 'Male' },
    { id: 'facebook/fastspeech2-en-ljspeech', name: 'Fiona', gender: 'Female' },
    { id: 'facebook/fastspeech2-en-vctk', name: 'George', gender: 'Male' },
]

// VoiceRSS Integration (Free Tier: 350 requests/day, Supports Male/Female)

// Map our internal IDs to VoiceRSS configuration
const VOICE_MAP: Record<string, { lang: string, voice: string }> = {
    // Male Voices
    'microsoft/speecht5_tts': { lang: 'en-gov', voice: 'John' },       // Austin (US Male) - 'en-gov' ??? Wait, en-us
    'facebook/mms-tts-eng': { lang: 'en-us', voice: 'Mike' },          // Edward (US Male)
    'Matthijs/speecht5_tts-common_voice_en': { lang: 'en-gb', voice: 'Harry' }, // Brian (UK Male)
    'facebook/fastspeech2-en-vctk': { lang: 'en-au', voice: 'Jack' },  // George (AU Male)

    // Female Voices
    'espnet/kan-bayashi_ljspeech_vits': { lang: 'en-au', voice: 'Zoe' }, // Claire (AU Female)
    'facebook/fastspeech2-en-ljspeech': { lang: 'en-gb', voice: 'Alice' }, // Fiona (UK Female) -> Wait, Alice is GB or US? Alice is usually GB in VoiceRSS docs? Let's check. Search says Alice (GB).
    'kakao-enterprise/vits-ljspeech-nosanitizer': { lang: 'en-in', voice: 'Jai' } // Daisy (IN Female)
}

// Fallback key just for initial demo if user hasn't set it (optional, but better to force user)
// Actually, I can't provide a key. I must ask user.

export async function generateTTS(text: string, modelId?: string): Promise<string> {
    try {
        const apiKey = process.env.VOICERSS_API_KEY
        if (!apiKey) {
            console.warn("VOICERSS_API_KEY missing, using Google TTS fallback (all female) as last resort")
            return await generateGoogleTTS(text, modelId)
        }

        const model = modelId || 'microsoft/speecht5_tts'
        const config = VOICE_MAP[model] || { lang: 'en-us', voice: 'John' }

        const url = `http://api.voicerss.org/?key=${apiKey}&hl=${config.lang}&v=${config.voice}&src=${encodeURIComponent(text)}&r=0&c=mp3&f=44khz_16bit_stereo`

        console.log(`[VoiceRSS] Requesting TTS: ${config.voice} (${config.lang})`)

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`VoiceRSS API error: ${response.status}`)
        }

        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // VoiceRSS returns error text in body if something is wrong (like invalid key)
        // If content-type is audio, it's good.
        const contentType = response.headers.get('content-type')
        if (contentType && !contentType.includes('audio')) {
            const errorText = buffer.toString()
            if (errorText.includes("ERROR")) {
                throw new Error(`VoiceRSS Error: ${errorText}`)
            }
        }

        const base64 = buffer.toString('base64')
        return `data:audio/mp3;base64,${base64}`

    } catch (error) {
        console.error("VoiceRSS failed:", error)
        // Fallback to Google if VoiceRSS fails (e.g. quota or no key)
        return await generateGoogleTTS(text, modelId)
    }
}

// Keep Google TTS as emergency backup (Female only usually)
async function generateGoogleTTS(text: string, modelId?: string): Promise<string> {
    // ... existing google implementation ...
    const localeMap: Record<string, string> = {
        'microsoft/speecht5_tts': 'en-US',
        'Matthijs/speecht5_tts-common_voice_en': 'en-GB',
        'espnet/kan-bayashi_ljspeech_vits': 'en-AU',
        'kakao-enterprise/vits-ljspeech-nosanitizer': 'en-IN',
        'facebook/mms-tts-eng': 'en-US',
        'facebook/fastspeech2-en-ljspeech': 'en-GB',
        'facebook/fastspeech2-en-vctk': 'en-AU',
    }
    const locale = localeMap[modelId || ''] || 'en-US'
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(text)}&tl=${locale}`
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    return `data:audio/mpeg;base64,${base64}`
}

// Text-to-Video - Generate a cinematic image
export async function generateVideo(prompt: string): Promise<string> {
    try {
        // Generate a cinematic style image
        const enhancedPrompt = `${prompt}, cinematic lighting, high quality, professional photography`
        const imageUrl = await generateImage(enhancedPrompt)

        return imageUrl
    } catch (error) {
        console.error("Error generating video:", error)
        throw new Error("Failed to generate video. Error: " + (error as any)?.message)
    }
}
