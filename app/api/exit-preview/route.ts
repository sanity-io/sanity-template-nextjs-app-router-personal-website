import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  draftMode().disable()
  const url = new URL(req.nextUrl)
  return NextResponse.redirect(new URL('/', url.origin))
}
