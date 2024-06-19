import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
    console.log(`.env.local file exists at: ${envPath}`)
} else {
    console.log(`.env.local file does NOT exist at: ${envPath}`)
}

console.log('Loading .env.local...')
console.log(
    'NEXT_PUBLIC_SANITY_PROJECT_ID:',
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
)
console.log(
    'NEXT_PUBLIC_SANITY_DATASET:',
    process.env.NEXT_PUBLIC_SANITY_DATASET,
)
console.log(
    'NEXT_PUBLIC_SANITY_API_VERSION:',
    process.env.NEXT_PUBLIC_SANITY_API_VERSION,
)
console.log('SANITY_API_READ_TOKEN:', process.env.SANITY_API_READ_TOKEN)
console.log('SANITY_API_WRITE_TOKEN:', process.env.SANITY_API_WRITE_TOKEN)

/** @type {import('next').NextConfig} */
const config = {
    images: {
        remotePatterns: [
            { hostname: 'cdn.sanity.io' },
            { hostname: 'source.unsplash.com' },
        ],
    },
    typescript: {
        // Set this to false if you want production builds to abort if there's type errors
        ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    },
    eslint: {
        // Set this to false if you want production builds to abort if there's lint errors
        ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
    },
    env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID:
            process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_API_VERSION:
            process.env.NEXT_PUBLIC_SANITY_API_VERSION,
        SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
        SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    },
    // trailingSlash: true,
    // output: 'export',
}

export default config
