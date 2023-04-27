import { previewData } from 'next/headers'

export function getPreviewToken(): string | null | undefined {
  return (previewData() as { token?: string | null })?.token
}
