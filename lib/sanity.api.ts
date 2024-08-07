export const useCdn = false

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const dataset : string = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId : string = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const readToken : string = process.env.SANITY_API_READ_TOKEN || ''

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion : string =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'

// Used to generate URLs for previewing your content
export const DRAFT_MODE_ROUTE : string = '/api/draft'

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl : string = '/studio'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage)
    }

    return v
}

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
