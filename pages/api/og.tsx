import { createClient } from '@sanity/client'
import { ImageResponse } from '@vercel/og'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextRequest, NextResponse } from 'next/server'

export const config : { runtime : string } = { runtime: 'edge' }

import { height, OpenGraphImage, width } from 'components/OpenGraphImage'
import * as demo from 'lib/demo.data'
import { Settings, settingsQuery } from 'lib/sanity.queries'
import {SanityClient} from "next-sanity";

export default async function og(req: NextRequest, res: NextResponse) : Promise<ImageResponse> {
    const font : Promise<ArrayBuffer> = fetch(new URL('public/Inter-Bold.woff', import.meta.url)).then(
        (res : Response) => res.arrayBuffer(),
    )
    const { searchParams } = new URL(req.url)

    let title : string = searchParams.get('title')
    if (!title) {
        const client : SanityClient = createClient({
            projectId,
            dataset,
            apiVersion,
            useCdn: false,
        })
        const settings : Settings = (await client.fetch<Settings>(settingsQuery)) || {}
        title = settings?.ogImage?.title
    }

    return new ImageResponse(
        <OpenGraphImage title={title || demo.ogImageTitle} />,
        {
            width,
            height,
            fonts: [
                {
                    name: 'Inter',
                    data: await font,
                    style: 'normal',
                    weight: 700,
                },
            ],
        },
    )
}
