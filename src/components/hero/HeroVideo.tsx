'use client'

import { useRef, useState, useEffect } from 'react'

type VideoStatus = 'loading' | 'playing' | 'buffering' | 'error'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState<VideoStatus>('loading')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Yavaş bağlantı veya veri tasarrufu modunda videoyu yükleme
    type NavWithConnection = Navigator & {
      connection?: { saveData: boolean; effectiveType: string }
    }
    const conn = (navigator as NavWithConnection).connection
    if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
      setStatus('error')
      return
    }

    const onCanPlay  = () => setStatus('playing')
    const onWaiting  = () => setStatus('buffering')
    const onPlaying  = () => setStatus('playing')
    const onError    = () => setStatus('error')
    const onStalled  = () => setStatus('buffering')

    video.addEventListener('canplay',  onCanPlay)
    video.addEventListener('waiting',  onWaiting)
    video.addEventListener('playing',  onPlaying)
    video.addEventListener('error',    onError)
    video.addEventListener('stalled',  onStalled)

    return () => {
      video.removeEventListener('canplay',  onCanPlay)
      video.removeEventListener('waiting',  onWaiting)
      video.removeEventListener('playing',  onPlaying)
      video.removeEventListener('error',    onError)
      video.removeEventListener('stalled',  onStalled)
    }
  }, [])

  return (
    <>
      {/* Koyu fallback — video hazır olana kadar görünür */}
      <div
        className="absolute inset-0 bg-neutral-950 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: status === 'playing' ? 0 : 1, zIndex: 1 }}
      />

      {/* Buffering göstergesi — video donduğunda hafif overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: status === 'buffering' ? 1 : 0, zIndex: 2 }}
      />

      {status !== 'error' && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // controlsList olmadan tarayıcı kendi buffering mekanizmasını kullanır
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          {/* MP4 — geniş tarayıcı desteği */}
          <source src="/test.MP4" type="video/mp4" />
        </video>
      )}
    </>
  )
}
