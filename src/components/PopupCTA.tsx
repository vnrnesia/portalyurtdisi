'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function PopupCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    // Sadece bir kez açılması için session storage kullanılabilir
    // Şimdilik 10 saniye sonra açılacak şekilde ayarlıyoruz
    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasOpened(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* Kapatma Butonu */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900"
          aria-label="Kapat"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Resim Bölümü */}
        <div className="relative w-full md:w-[45%] h-64 md:h-auto bg-white">
          <Image
            src="/popup.png"
            alt="Yurtdışı Eğitim Hayali"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover md:object-contain object-center p-4"
          />
        </div>

        {/* İçerik Bölümü */}
        <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-[26px] md:text-[32px] font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight">
            Yurtdışında eğitim<br />alacağınızdan eminiz
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-[15px] font-medium">
            Portal uzmanları sonuç garantisi sunar: Başvuru sürecinizi titizlikle yönetir, her aşamada size rehberlik eder ve hayalinizdeki üniversiteye kabulünüzü güvence altına alırız.
          </p>
          <Link 
            href="/iletisim"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#f04420] hover:bg-[#d93a1a] text-white font-bold rounded-xl transition-colors duration-200 self-center md:self-start text-[15px] shadow-sm hover:shadow-md"
          >
            Başvuru yapın
          </Link>
        </div>
        
      </div>
    </div>
  )
}
