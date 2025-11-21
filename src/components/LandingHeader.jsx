import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '#hero', label: 'About' },
    { href: '#gallery', label: 'Destinations' },
    { href: '#features', label: 'Why Kandy LK' },
    { href: '#stats', label: 'Social Proof' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-white/70 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#hero" className="text-white md:text-gray-900 font-semibold tracking-wide text-lg">
          <span className="px-2 py-1 rounded bg-black/60 md:bg-transparent md:text-inherit text-white">Kandy LK</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} className="text-white md:text-gray-800 hover:opacity-80 transition-opacity">
              {n.label}
            </a>
          ))}
          <div className="h-6 w-px bg-white/30 md:bg-gray-300" />
          <a href="#" className="text-white md:text-gray-800 hover:opacity-80">Log in</a>
          <a href="#cta" className="ml-3 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#A85D3F] text-white hover:opacity-90 transition">Sign up</a>
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white text-gray-900 px-4 pb-4 space-y-2">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2">
              {n.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="#" className="px-4 py-2 rounded border">Log in</a>
            <a href="#cta" className="px-4 py-2 rounded bg-[#A85D3F] text-white">Sign up</a>
          </div>
        </div>
      )}
    </header>
  )
}
