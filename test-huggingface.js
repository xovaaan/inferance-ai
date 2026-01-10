require('dotenv').config({ path: '.env.local' })
const { HfInference } = require('@huggingface/inference')

async function testHuggingFace() {
    console.log('🧪 Testing Hugging Face API...\n')

    if (!process.env.HUGGINGFACE_API_KEY) {
        console.log('❌ Error: HUGGINGFACE_API_KEY not found in .env.local')
        return
    }

    console.log('✅ API key found!')
    console.log('   Key starts with:', process.env.HUGGINGFACE_API_KEY.substring(0, 6) + '...')

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

    try {
        console.log('\nTesting image generation (this may take 10-20 seconds)...')
        const imageBlob = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0',
            inputs: 'a cute cat',
        })

        console.log('✅ Image generation: Working!')
        console.log('   Size:', Math.round(imageBlob.size / 1024), 'KB')

        console.log('\n🎉 Setup successful! Your Hugging Face API is ready!')
        console.log('\n📊 You can now:')
        console.log('   1. Restart your dev server (Ctrl+C then npm run dev)')
        console.log('   2. Visit http://localhost:3000')
        console.log('   3. Try generating images!')

    } catch (error) {
        console.log('❌ Error:', error.message)
        console.log('\n🔧 Troubleshooting:')
        console.log('1. Check your token at https://huggingface.co/settings/tokens')
        console.log('2. Make sure it has "read" permission')
        console.log('3. Token should start with "hf_"')
    }
}

testHuggingFace()
