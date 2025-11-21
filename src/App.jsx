import { useState } from 'react'
import Header from './components/Header'
import Discover from './components/Discover'
import Guides from './components/Guides'
import Businesses from './components/Businesses'
import Bookings from './components/Bookings'

function App() {
  const [tab, setTab] = useState('discover')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header active={tab} onChange={setTab} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Discover Sri Lanka, the authentic way</h1>
          <p className="mt-3 text-white/90 max-w-2xl">Find verified guides, trusted local businesses, and hidden destinations—from Kandy to Ella and beyond.</p>
        </div>
      </section>

      {/* Content */}
      {tab === 'discover' && <Discover />}
      {tab === 'guides' && <Guides />}
      {tab === 'businesses' && <Businesses />}
      {tab === 'bookings' && <Bookings />}

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
          <p>© {new Date().getFullYear()} Kandy LK</p>
          <p>Early MVP — data may be sample only</p>
        </div>
      </footer>

      {/* Small utility styles */}
      <style>{`
        .input { @apply px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 ring-blue-600; }
        .btn-primary { @apply px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors; }
        .btn-secondary { @apply px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-800 text-sm; }
      `}</style>
    </div>
  )
}

export default App
