import { NextRequest, NextResponse } from 'next/server'
import { postToSheet } from '@/lib/sheets'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 })
  }

  const {
    ad,
    telefon,
    email,
    sehir,
    program,
    mesaj,
    kaynak,
    hizmet,
    butce,
    detay,
    sessionId,
  } = body as Record<string, string | undefined>

  if (!ad || !telefon) {
    return NextResponse.json({ error: 'Ad ve telefon zorunlu.' }, { status: 400 })
  }

  try {
    await postToSheet({
      type: 'lead',
      tarih: new Date().toISOString(),
      kaynak: kaynak || 'Bilinmiyor',
      ad,
      telefon,
      email: email || '',
      sehir: sehir || '',
      hizmet: hizmet || '',
      program: program || '',
      butce: butce || '',
      detay: detay || '',
      mesaj: mesaj || '',
    })

    // PortalGPT'den geldiyse ilgili sohbet satırına iletişimi de işle
    if (sessionId) {
      await postToSheet({
        type: 'portalgpt-contact',
        sessionId,
        iletisim: telefon,
      }).catch((err) => console.error('PortalGPT iletişim güncellenemedi:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Sheets error:', err)
    return NextResponse.json({ error: 'Kayıt oluşturulamadı.' }, { status: 500 })
  }
}
