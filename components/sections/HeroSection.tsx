'use client'
import { useEffect, useRef } from 'react'
import { SiteContent } from '@/lib/store'
import "@/components/style/hero.css"

export default function HeroSection({ content }: { content: SiteContent['hero'] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Road / highway grid lines effect
    const lines: { x: number; y: number; speed: number; length: number; alpha: number; horizontal: boolean }[] = []
    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1.5 + 0.5,
        length: Math.random() * 60 + 20,
        alpha: Math.random() * 0.3 + 0.05,
        horizontal: Math.random() > 0.6,
      })
    }

    // Dots
    const dots: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * (canvas.width || 1200),
        y: Math.random() * (canvas.height || 800),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Moving lines (highway dashes)
      lines.forEach(l => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(245,166,35,${l.alpha})`
        ctx.lineWidth = 1
        if (l.horizontal) {
          ctx.moveTo(l.x, l.y)
          ctx.lineTo(l.x + l.length, l.y)
        } else {
          ctx.moveTo(l.x, l.y)
          ctx.lineTo(l.x, l.y + l.length)
        }
        ctx.stroke()
        l.y += l.speed
        if (l.y > canvas.height + 80) {
          l.y = -80
          l.x = Math.random() * canvas.width
        }
      })

      // Dots + connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(245,166,35,${0.1 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
        ctx.beginPath()
        ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,166,35,${dots[i].alpha})`
        ctx.fill()
        dots[i].x += dots[i].vx
        dots[i].y += dots[i].vy
        if (dots[i].x < 0 || dots[i].x > canvas.width) dots[i].vx *= -1
        if (dots[i].y < 0 || dots[i].y > canvas.height) dots[i].vy *= -1
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <>
      <section className="hero" id="home">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-stripe" />
        <div className="hero-glow" />
        <div className="hero-fade" />

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              FMCSA Compliant ELD Service
            </div>

            <h1 className="hero-headline">
              {content.headline}
            </h1>

            <p className="hero-sub">{content.subheadline}</p>

            <div className="hero-actions">
              <a href="#contact" className="btn-gold">
                {content.btn1}
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              {/* <a href="#contact" className="btn-outline">{content.btn2}</a> */}
            </div>

            <div className="hero-stats">
              {content.stats.map((s, i) => (
                <div className="hstat" key={i}>
                  <div className="hstat-val">{s.value}</div>
                  <div className="hstat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
