import { NextRequest, NextResponse } from 'next/server'
import { buildPortalContext } from '@/lib/portal-data'
import { postToSheet } from '@/lib/sheets'

export const runtime = 'nodejs'

interface Recommendation {
  name: string
  program: string
  country: string
  tuition: string
  match: number
  reason: string
}

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `Sen "Portal GPT"sin — Portal Yurtdışı eğitim danışmanlık şirketinin samimi üniversite seçim asistanısın. Kullanıcıyla sohbet ederek hedef/bütçe/tercihlerini anlar ve AŞAĞIDAKİ partner üniversite listesinden en uygun seçenekleri önerirsin.

KURALLAR:
- SADECE aşağıda verilen partner üniversite listesinden öneri yap. Listede OLMAYAN bir üniversiteyi ASLA önerme veya uydurma.
- Kullanıcının istediği ÜLKE bizim hizmet kapsamımızdaysa (Rusya, Polonya, İspanya), MUTLAKA en az 1-3 üniversite öner — asla tamamen reddetme. Bir üniversitenin belirli bir bölümü (Tıp, Mühendislik, Ekonomi, Diş Hekimliği vb.) sunup sunmadığı listede açıkça yazmasa bile, üniversitenin adından ve açıklamasından çıkarım yaparak kullanıcının ilgisine en yakın adayları öner; kesin bölüm/ücret bilgisinin danışman tarafından doğrulanacağını belirt.
- Rusya devlet üniversiteleri genellikle Tıp, Diş Hekimliği, Mühendislik, Bilgisayar, Ekonomi gibi yaygın alanlarda program sunar; bu nedenle bu alanlarda çekingen davranma, uygun üniversiteleri öner.
- Kesin ücret/kontenjan bilgisini uydurma. Ücret listede yoksa "tuition" alanına "Danışmana sorun" yaz.
- Yalnızca kullanıcının istediği ülke hizmet kapsamımızın TAMAMEN dışındaysa (örn. ABD, Almanya, İngiltere) öneri listesini boş bırak ve "message" alanında nazikçe hangi ülkelerde (Rusya, Polonya, İspanya) hizmet verdiğimizi söyle.
- Kullanıcı henüz yeterli bilgi vermediyse (ör. sadece "merhaba" dediyse), öneri listesini boş bırak ve "message" alanında samimi bir şekilde hedefini/ülkesini/bütçesini sor.
- En fazla 3 öneri ver, en uygundan başlayarak. Her birine 0-100 arası gerçekçi bir "match" puanı ver.
- Her durumda "routeToConsultant" true olmalı. Tüm metinler TÜRKÇE, samimi ve kısa olmalı. "Kesin kabul" gibi garanti ifadeleri kullanma.

YANITINI SADECE şu JSON formatında ver:
{
  "message": "kullanıcıya kısa, sohbet havasında yanıt (1-3 cümle). Gerekirse netleştirici soru sor.",
  "recommendations": [
    { "name": "tam üniversite adı (listeden)", "program": "önerilen bölüm/program", "country": "ülke", "tuition": "ücret veya 'Danışmana sorun'", "match": 0-100, "reason": "neden uygun olduğu (kısa)" }
  ],
  "routeToConsultant": true
}

${buildPortalContext()}`

// OpenAI çağrısı — geçici ağ/bağlantı hatalarına karşı yeniden dener
async function callOpenAI(apiKey: string, messages: ChatMsg[] | { role: string; content: string }[]) {
  const maxAttempts = 2
  let lastErr: unknown
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.4,
          response_format: { type: 'json_object' },
          messages,
        }),
        signal: AbortSignal.timeout(30000),
      })
    } catch (e) {
      lastErr = e
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 600 * attempt))
      }
    }
  }
  throw lastErr
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI anahtarı yapılandırılmamış.' },
      { status: 500 }
    )
  }

  let prompt = ''
  let history: ChatMsg[] = []
  let sessionId = ''
  try {
    const body = await req.json()
    prompt = (body?.prompt ?? '').toString().trim()
    sessionId = (body?.sessionId ?? '').toString().slice(0, 80)
    if (Array.isArray(body?.history)) {
      history = body.history
        .filter(
          (m: unknown): m is ChatMsg =>
            !!m &&
            typeof m === 'object' &&
            (((m as ChatMsg).role === 'user') || ((m as ChatMsg).role === 'assistant')) &&
            typeof (m as ChatMsg).content === 'string'
        )
        .slice(-8)
        .map((m: ChatMsg) => ({ role: m.role, content: m.content.slice(0, 1500) }))
    }
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 })
  }

  if (!prompt) {
    return NextResponse.json({ error: 'Lütfen hedeflerinizi yazın.' }, { status: 400 })
  }
  if (prompt.length > 1500) prompt = prompt.slice(0, 1500)

  try {
    const res = await callOpenAI(apiKey, [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: prompt },
    ])

    if (!res.ok) {
      const err = await res.text()
      console.error('OpenAI error:', err)
      return NextResponse.json({ error: 'Analiz şu an yapılamıyor.' }, { status: 502 })
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content ?? '{}'

    let parsed: {
      message?: string
      recommendations?: Recommendation[]
      routeToConsultant?: boolean
    }
    try {
      parsed = JSON.parse(content)
    } catch {
      return NextResponse.json({ error: 'Yanıt işlenemedi.' }, { status: 502 })
    }

    const recommendations = Array.isArray(parsed.recommendations)
      ? parsed.recommendations.slice(0, 3).map((r) => ({
          name: String(r.name ?? ''),
          program: String(r.program ?? ''),
          country: String(r.country ?? ''),
          tuition: String(r.tuition ?? 'Danışmana sorun'),
          match: Math.max(0, Math.min(100, Number(r.match) || 0)),
          reason: String(r.reason ?? ''),
        }))
      : []

    const message = String(parsed.message ?? '')

    // Sohbeti Google Sheets'e logla (iletişim bırakılmasa bile).
    // sessionId'e göre upsert → her sohbet tek satırda büyür.
    if (sessionId) {
      const ilkSoru = history.find((m) => m.role === 'user')?.content ?? prompt
      const transcript = [
        ...history,
        { role: 'user' as const, content: prompt },
        {
          role: 'assistant' as const,
          content:
            message +
            (recommendations.length
              ? '\nÖnerilenler: ' +
                recommendations.map((r) => `${r.name} (${r.program}, %${r.match})`).join(', ')
              : ''),
        },
      ]
        .map((m) => `${m.role === 'user' ? 'Kullanıcı' : 'PortalGPT'}: ${m.content}`)
        .join('\n\n')

      const sonOneriler = recommendations
        .map((r) => `${r.name} — ${r.program} (%${r.match})`)
        .join(' | ')

      try {
        await postToSheet({
          type: 'portalgpt',
          tarih: new Date().toISOString(),
          sessionId,
          ilkSoru,
          transcript,
          sonOneriler,
        })
      } catch (logErr) {
        console.error('PortalGPT sohbet loglanamadı:', logErr)
      }
    }

    return NextResponse.json({
      message,
      recommendations,
      routeToConsultant: parsed.routeToConsultant !== false,
    })
  } catch (e) {
    const cause = (e as { cause?: { code?: string } })?.cause
    const code = cause?.code
    const isConnIssue =
      code === 'UND_ERR_CONNECT_TIMEOUT' ||
      code === 'ENOTFOUND' ||
      code === 'ECONNREFUSED' ||
      (e instanceof Error && (e.name === 'TimeoutError' || e.name === 'AbortError' || /timeout|fetch failed/i.test(e.message)))
    console.error('PortalGPT route error:', e)
    return NextResponse.json(
      {
        error: isConnIssue
          ? 'Yapay zekâ servisine şu an ulaşılamıyor (ağ/bağlantı sorunu). Birkaç saniye sonra tekrar deneyin.'
          : 'Beklenmeyen bir hata oluştu.',
      },
      { status: isConnIssue ? 504 : 500 }
    )
  }
}
