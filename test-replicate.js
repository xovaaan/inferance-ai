require('dotenv').config({ path: '.env.local' })
const Replicate = require('replicate')

async function testReplicate() {
    console.log('🧪 Testing Replicate API...\n')

    if (!process.env.REPLICATE_API_TOKEN) {
        console.log('❌ Error: REPLICATE_API_TOKEN not found in .env.local')
        console.log('   Please add: REPLICATE_API_TOKEN=r8_your_token_here')
        return
    }

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    })

    try {
        console.log('Testing image generation...')
        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input: {
                    prompt: "a beautiful sunset over mountains, high quality",
                    num_outputs: 1,
                }
            }
        )

        console.log('✅ Image generation: Working!')
        console.log('Generated image:', output[0])
        console.log('\nSetup successful! Your Replicate API is ready to use! 🚀')
    } catch (error) {
        console.log('❌ Error:', error.message)
        console.log('\nTroubleshooting:')
        console.log('1. Check your API token in .env.local')
        console.log('2. Verify token at https://replicate.com/account/api-tokens')
        console.log('3. Make sure billing is set up (you have $5 free credit)')
    }
}

testReplicate()
