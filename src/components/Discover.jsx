import { useEffect, useState } from 'react'
import { Loader2, MapPin, Compass } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Discover() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: '', region: '', q: '' })

  const fetchPlaces = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v))
    const res = await fetch(`${API}/places?${params.toString()}`)
    const data = await res.json()
    setPlaces(data)
    setLoading(false)
  }

  useEffect(() => { fetchPlaces() }, [])

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input placeholder="Search places..." className="input" value={filters.q} onChange={e => setFilters(f => ({...f, q: e.target.value}))} />
        <select className="input" value={filters.category} onChange={e => setFilters(f => ({...f, category: e.target.value}))}>
          <option value="">All categories</option>
          <option value="nature">Nature</option>
          <option value="culture">Culture</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
        </select>
        <input placeholder="Region (e.g., Kandy)" className="input" value={filters.region} onChange={e => setFilters(f => ({...f, region: e.target.value}))} />
        <button onClick={fetchPlaces} className="btn-primary">Search</button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500"><Loader2 className="animate-spin mr-2" /> Loading places...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((p, i) => (
            <div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm">
              {p.images && p.images[0] ? (
                <img src={p.images[0]} alt={p.name} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600">
                  <Compass />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                {p.region && (
                  <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin size={16} /> {p.region}</p>
                )}
                {p.description && (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">{p.description}</p>
                )}
                {p.best_time && (
                  <p className="text-xs text-gray-500 mt-2">Best time: {p.best_time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Discover
