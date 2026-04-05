import { NextRequest, NextResponse } from 'next/server'
import { getContent, updateContent, SiteContent } from '@/lib/store'
import { sessions } from '@/lib/auth'

export async function GET() {
  return NextResponse.json(await getContent())
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const exp = sessions.get(token || '')
    if (!exp || exp < Date.now()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { section, data } = body
    
    // If section is provided, update that section only (legacy/individual tab).
    // If not, assume body is the full content.
    let updated: SiteContent;
    if (section && data) {
      updated = await updateContent(section as keyof SiteContent, data)
    } else {
      // Treat body as the entire updated content object
      const { prisma } = await import('@/lib/prisma')
      await prisma.siteContent.upsert({
        where: { id: 1 },
        create: { id: 1, content: JSON.stringify(body) },
        update: { content: JSON.stringify(body) }
      })
      updated = body
    }

    return NextResponse.json({ success: true, content: updated })
  } catch (error: any) {
    console.error("API error updating content:", error.message || error)
    return NextResponse.json({ error: 'Invalid request', details: error.message }, { status: 400 })
  }
}
