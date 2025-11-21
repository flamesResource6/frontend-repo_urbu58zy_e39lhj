import { MapPin, Users, Store, CalendarDays } from 'lucide-react'

function Header({ active, onChange }) {
  const tabs = [
    { key: 'discover', label: 'Discover', icon: MapPin },
    { key: 'guides', label: 'Guides', icon: Users },
    { key: 'businesses', label: 'Businesses', icon: Store },
    { key: 'bookings', label: 'Bookings', icon: CalendarDays },
  ]

  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Kandy LK" className="w-8 h-8" />
          <span className="font-semibold text-lg">Kandy LK</span>
        </div>
        <nav className="flex gap-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                active === key ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
        <a href="/test" className="text-sm text-blue-600 hover:underline">System</a>
      </div>
    </header>
  )
}

export default Header
