'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const inputCls =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#f04420] transition-colors'

// +90 5xx xxx xx xx maskesi
function formatTrPhone(value: string): string {
  let d = value.replace(/\D/g, '')
  if (d.startsWith('90')) d = d.slice(2)
  d = d.slice(0, 10)
  if (!d) return ''
  let out = d.slice(0, 3)
  if (d.length >= 4) out += ' ' + d.slice(3, 6)
  if (d.length >= 7) out += ' ' + d.slice(6, 8)
  if (d.length >= 9) out += ' ' + d.slice(8, 10)
  return '+90 ' + out
}

export default function LeadSearchBar() {
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // backend bağlanınca burada gönderim yapılacak
  }

  return (
    <div className="relative z-20 -mt-20 lg:-mt-24">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-34">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] p-6 lg:p-8">
          <p className="text-[16px] font-bold text-[#1c1c1e] mb-4">
            Özel İndirim Fırsatlarından Yararlan
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-3">
            <input
              type="text"
              placeholder="Ad Soyad"
              required
              className={`${inputCls} flex-1`}
            />
            <input
              type="tel"
              inputMode="tel"
              placeholder="+90 5xx xxx xx xx"
              value={phone}
              onChange={(e) => setPhone(formatTrPhone(e.target.value))}
              required
              className={`${inputCls} flex-1`}
            />
            <input
              type="email"
              placeholder="ornek@mail.com"
              required
              className={`${inputCls} flex-1`}
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f04420] hover:bg-[#d93a1a] text-white text-[14px] font-bold px-7 py-3 transition-colors whitespace-nowrap"
            >
              Fırsatları Yakala
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
