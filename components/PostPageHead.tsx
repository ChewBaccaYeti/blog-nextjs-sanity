import BlogMeta from 'components/BlogMeta'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import { Post, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface PostPageHeadProps {
  settings: Settings | null
  post: Post | null
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  console.log('settings:', settings)
  console.log('post:', post)

  const title = settings?.title ?? demo.title
  const postTitle = post?.title ? `${post.title} | ${title}` : title

  console.log('settings:', settings)
  console.log('post:', post)
  console.log('title:', title)
  console.log('postTitle:', postTitle)

  return (
    <Head>
      <title>{postTitle}</title>
      <BlogMeta />
      {post?.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
