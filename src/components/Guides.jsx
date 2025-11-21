import { useEffect, useState } from 'react'
import { Loader2, Star, CheckCircle2 } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Guides() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ language: '', specialization: '', verified: '' })

  const fetchGuides = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v))
    const res = await fetch(`${API}/guides?${params.toString()}`)
    const data = await res.json()
    setGuides(data)
    setLoading(false)
  }

  useEffect(() => { fetchGuides() }, [])

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input placeholder="Search specialization..." className="input" value={filters.specialization} onChange={e => setFilters(f => ({...f, specialization: e.target.value}))} />
        <input placeholder="Language (e.g., English)" className="input" value={filters.language} onChange={e => setFilters(f => ({...f, language: e.target.value}))} />
        <select className="input" value={filters.verified} onChange={e => setFilters(f => ({...f, verified: e.target.value}))}>
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
        <button onClick={fetchGuides} className="btn-primary">Search</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500"><Loader2 className="animate-spin mr-2" /> Loading guides...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((g, i) => (
            <div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm p-4 flex gap-3">
              {g.photo_url ? (
                <img src={g.photo_url} alt={g.full_name} className="w-24 h-24 rounded-lg object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{g.full_name}</h3>
                  {g.verified && <CheckCircle2 className="text-blue-600" size={18} />}
                </div>
                <p className="text-sm text-gray-600">{g.home_base || 'Sri Lanka'}</p>
                <div className="flex items-center gap-1 text-amber-500 mt-1">
                  {Array.from({ length: Math.round(g.rating || 0) }).map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                  <span className="text-xs text-gray-600 ml-1">({g.total_reviews || 0})</span>
                </div>
                {g.languages?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">Languages: {g.languages.join(', ')}</p>
                )}
                {g.specializations?.length > 0 && (
                  <p className="text-xs text-gray-500">Specializations: {g.specializations.join(', ')}</p>
                )}
                {g.day_rate_usd && (
                  <p className="text-sm font-medium mt-1">From ${g.day_rate_usd}/day</p>
                )}
                <button className="btn-secondary mt-2">View details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Guides
