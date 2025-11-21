import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Bookings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ guide_id: '', user_email: '', status: '' })

  const fetchItems = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v))
    const res = await fetch(`${API}/bookings?${params.toString()}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <section className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input placeholder="Guide ID" className="input" value={filters.guide_id} onChange={e => setFilters(f => ({...f, guide_id: e.target.value}))} />
        <input placeholder="Your email" className="input" value={filters.user_email} onChange={e => setFilters(f => ({...f, user_email: e.target.value}))} />
        <select className="input" value={filters.status} onChange={e => setFilters(f => ({...f, status: e.target.value}))}>
          <option value="">Any status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={fetchItems} className="btn-primary">Search</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500"><Loader2 className="animate-spin mr-2" /> Loading bookings...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((b, i) => (
            <div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm p-4">
              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                <span><span className="font-medium">Guide:</span> {b.guide_id}</span>
                {b.package_id && <span><span className="font-medium">Package:</span> {b.package_id}</span>}
                <span><span className="font-medium">Dates:</span> {b.start_date} → {b.end_date}</span>
                <span><span className="font-medium">Party:</span> {b.party_size}</span>
                <span className={`px-2 py-0.5 rounded text-white ${
                  b.status === 'confirmed' ? 'bg-emerald-600' : b.status === 'completed' ? 'bg-blue-600' : b.status === 'cancelled' ? 'bg-gray-600' : 'bg-amber-600'
                }`}>{b.status}</span>
              </div>
              {b.notes && <p className="text-sm text-gray-600 mt-2">Notes: {b.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Bookings
