import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import type { Metadata } from 'next'
import type { Image } from 'sanity'

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `page.tsx` files and used by `generateMetadata` functions.
 */
export function defineMetadata({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string
  description?: string
  image?: Image
  title?: string
}) {
  const metaTitle = [
    ...(title ? [title] : []),
    ...(baseTitle ? [baseTitle] : []),
  ].join(' | ')

  const imageUrl =
    image && urlForImage(image)?.width(1200).height(627).fit('crop').url()

  return {
    title: metaTitle || demo.title,
    themeColor: '#000',
    description,
    openGraph: imageUrl
      ? {
          images: [imageUrl],
        }
      : undefined,
  } satisfies Metadata
}

/*
<link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
    */
