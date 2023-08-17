/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import Studio from './Studio'

export const runtime = 'edge'

export { metadata } from 'next-sanity/studio/metadata'

export default function StudioPage() {
  return <Studio />
}
