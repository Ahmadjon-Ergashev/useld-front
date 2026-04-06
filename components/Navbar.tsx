'use client'
import { useState, useEffect } from 'react'
import { LogoContent } from "@/components/icons"
import { ArrowUpRight, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import "@/components/style/navbar.css"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Partners', href: '#partners' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo" style={{ width: '150px', height: '80px' }}>
              <LogoContent />
            </a>

            <ul className="nav-links">
              {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>

            <div className="nav-right">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              )}
              <a href="tel:+12247861501" className="btn-outline" style={{ fontSize: '16px', padding: '10px 20px' }}>
                Call Us Now
              </a>
              {/* <a href="/admin" className="nav-admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Admin <ArrowUpRight size={14} /></a> */}
              {/* <a href="#contact" className="btn-gold" style={{ padding: '10px 22px', fontSize: '14px' }}>Free Trial</a> */}
              {/* <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
                <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
                <span style={{ opacity: open ? 0 : 1 }} />
                <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <ul className="mobile-links">
          {links.map(l => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
          ))}
          <li><a href="/admin" onClick={() => setOpen(false)}>Admin Panel</a></li>
        </ul>
        <div className="mobile-cta">
          <a href="#contact" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={() => setOpen(false)}>Start Free Trial <ArrowRight size={16} /></a>
        </div>
      </div> */}
    </>
  )
}
