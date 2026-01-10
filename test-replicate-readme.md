# Test Replicate Integration

This is a simple test script to verify your Replicate API key works.

## How to Test

1. Make sure you have your `REPLICATE_API_TOKEN` in `.env.local`
2. Run this command:

```bash
node test-replicate.js
```

Expected output:
```
🧪 Testing Replicate API...

✅ Image generation: Working!
Generated image: https://replicate.delivery/...

Setup successful! Your Replicate API is ready to use! 🚀
```

---

## If You Get Errors

### "Invalid API token"
- Check your `.env.local` file
- Make sure `REPLICATE_API_TOKEN` is set correctly
- Token should start with `r8_`

### "Billing not set up"
- Go to https://replicate.com/account/billing
- Add a payment method (won't be charged initially)
- You have $5 free credit

### Other Errors
- Check your internet connection
- Verify token at https://replicate.com/account/api-tokens
- Make sure you're using the latest `replicate` package
