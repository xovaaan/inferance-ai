import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Text-to-Image using Stable Diffusion XL (more reliable than Flux)
export async function generateImage(prompt: string): Promise<string> {
    try {
        const blob = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0',
            inputs: prompt,
        })

        // Convert blob to base64 URL for immediate use
        const buffer = Buffer.from(await blob.arrayBuffer())
        const base64 = buffer.toString('base64')
        const imageUrl = `data:image/png;base64,${base64}`

        return imageUrl
    } catch (error) {
        console.error("Error generating image:", error)
        throw new Error("Failed to generate image. Error: " + (error as any)?.message)
    }
}

// Text-to-Speech - Using browser's built-in TTS (most reliable for free tier)
// Note: Actual TTS will be handled client-side using Web Speech API
export async function generateTTS(text: string): Promise<string> {
    // Return a success indicator - actual speech will be generated in the browser
    // This avoids Hugging Face TTS model availability issues
    return `tts-success:${text}`
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
