'use client'

import dynamic from 'next/dynamic'

// Re-exported components using next/dynamic ensures they're not bundled
// and sent to the browser unless actually used, with draftMode().enabled.

export default dynamic(() => import('./FooterLayout'))
