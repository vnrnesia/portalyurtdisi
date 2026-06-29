/**
 * Google Sheets'e (Apps Script Web App webhook'u üzerinden) veri yazar.
 * Yalnızca sunucu tarafında (route handler / Node runtime) çağrılmalıdır —
 * webhook URL'i ve secret istemciye sızdırılmaz.
 *
 * Apps Script tarafı `type` alanına göre ilgili sekmeye yazar:
 *   - 'lead'             → Leadler sekmesine yeni satır
 *   - 'portalgpt'        → PortalGPT sekmesinde sessionId'e göre upsert
 *   - 'portalgpt-contact'→ PortalGPT sekmesindeki ilgili satıra iletişim ekler
 */

export interface SheetPayload {
  type: 'lead' | 'portalgpt' | 'portalgpt-contact'
  [key: string]: unknown
}

/**
 * Webhook'a POST atar. Yapılandırma yoksa veya hata olursa fırlatır;
 * çağıran taraf bunu yakalayıp lead/AI akışını bozmamalıdır.
 */
export async function postToSheet(payload: SheetPayload): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  const secret = process.env.SHEETS_WEBHOOK_SECRET

  if (!url) {
    throw new Error('GOOGLE_SHEETS_WEBHOOK_URL tanımlı değil.')
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, secret }),
    // Apps Script web app'i googleusercontent.com'a 302 ile yönlendirir;
    // fetch varsayılan olarak takip eder.
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  })

  const text = await res.text().catch(() => '')

  if (!res.ok) {
    throw new Error(`Sheets webhook HTTP ${res.status}: ${text.slice(0, 200)}`)
  }

  // Apps Script mantıksal hatada bile HTTP 200 + HTML döndürebilir
  // (ör. dağıtım "Herkes"e açık değilse Google bir oturum/hata sayfasına yönlendirir).
  // Bu yüzden gövdeyi JSON olarak doğrulayıp { ok: true } bekliyoruz.
  let parsed: { ok?: boolean; error?: string }
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error(
      'Sheets webhook JSON yerine HTML döndürdü — dağıtım erişimi büyük olasılıkla "Herkes" değil ya da URL hatalı. ' +
        text.slice(0, 120)
    )
  }

  if (!parsed.ok) {
    throw new Error(`Sheets webhook reddetti: ${parsed.error || 'bilinmeyen hata (secret uyuşmuyor olabilir)'}`)
  }
}
