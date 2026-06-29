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

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Sheets webhook hatası (${res.status}): ${text.slice(0, 200)}`)
  }
}
