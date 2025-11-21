import { useEffect, useState } from 'react'
import { Loader2, MapPin } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Businesses() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ type: '', region: '', q: '' })

  const fetchItems = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v))
    const res = await fetch(`${API}/businesses?${params.toString()}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select className="input" value={filters.type} onChange={e => setFilters(f => ({...f, type: e.target.value}))}>
          <option value="">All types</option>
          <option value="restaurant">Restaurants</option>
          <option value="shop">Shops</option>
          <option value="guesthouse">Guesthouses</option>
          <option value="medical">Medical</option>
        </select>
        <input placeholder="Region (e.g., Ella)" className="input" value={filters.region} onChange={e => setFilters(f => ({...f, region: e.target.value}))} />
        <input placeholder="Search name..." className="input" value={filters.q} onChange={e => setFilters(f => ({...f, q: e.target.value}))} />
        <button onClick={fetchItems} className="btn-primary">Search</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500"><Loader2 className="animate-spin mr-2" /> Loading businesses...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((b, i) => (
            <div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm">
              {b.images && b.images[0] ? (
                <img src={b.images[0]} alt={b.name} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-emerald-100 to-teal-100" />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{b.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{b.type}</p>
                {b.location && (
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1"><MapPin size={16} /> {b.location}</p>
                )}
                {b.price_range && (<p className="text-xs text-gray-500 mt-1">Price: {b.price_range}</p>)}
                {b.opening_hours && (<p className="text-xs text-gray-500">Hours: {b.opening_hours}</p>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Businesses
