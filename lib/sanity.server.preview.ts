import { previewData } from 'next/headers'

export function getPreviewToken(): string | undefined {
  return (previewData() as { token?: string | null })?.token
}
