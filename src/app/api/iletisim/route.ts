import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { ad, telefon, email, sehir, program, mesaj } = body

  if (!ad || !telefon) {
    return NextResponse.json({ error: 'Ad ve telefon zorunlu.' }, { status: 400 })
  }

  const token   = process.env.TELEGRAM_BOT_TOKEN
  const chat_id = process.env.TELEGRAM_CHAT_ID

  if (!token || !chat_id) {
    return NextResponse.json({ error: 'Telegram yapılandırması eksik.' }, { status: 500 })
  }

  const text = [
    '🎓 *Yeni Başvuru – Portal Yurtdışı*',
    '',
    `👤 *Ad Soyad:* ${ad}`,
    `📞 *Telefon:* ${telefon}`,
    email  ? `📧 *E-posta:* ${email}`   : null,
    sehir  ? `🏙️ *Şehir:* ${sehir}`     : null,
    program ? `📚 *Program:* ${program}` : null,
    mesaj  ? `💬 *Mesaj:* ${mesaj}`      : null,
  ].filter(Boolean).join('\n')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text, parse_mode: 'Markdown' }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Telegram error:', err)
    return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
