import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_USER, ADMIN_PASS } from '@/lib/store'
import { sessions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return NextResponse.json({ valid: false })
  const exp = sessions.get(token)
  if (!exp || exp < Date.now()) { sessions.delete(token || ''); return NextResponse.json({ valid: false }) }
  return NextResponse.json({ valid: true })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (body.action === 'login') {
    if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
      const token = Math.random().toString(36).slice(2) + Date.now()
      sessions.set(token, Date.now() + 86400000)
      return NextResponse.json({ success: true, token })
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  if (body.action === 'logout') {
    const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    if (token) sessions.delete(token)
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
