import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Star } from 'lucide-react'
import LandingHeader from './LandingHeader'

const heroBg = 'https://images.unsplash.com/photo-1603287681836-b174ce5074be?q=80&w=1920&auto=format&fit=crop'
const galleryImgs = [
  'https://images.unsplash.com/photo-1544551763-7ef4200d2e26?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605244863941-1df7c4fbbf85?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
]

export default function LandingPage() {
  const { scrollY } = useScroll()
  const yHero = useTransform(scrollY, [0, 600], [0, -120])

  return (
    <div className="bg-white text-[#2C2C2C]">      
      <section id="hero" className="relative h-screen overflow-hidden">        
        <LandingHeader />
        <motion.div style={{ y: yHero }} className="absolute inset-0">
          <img src={heroBg} alt="Sri Lankan Temple" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.7}} className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Discover the Real<br />Sri Lanka
          </motion.h1>
          <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6, duration:0.7}} className="mt-6 max-w-2xl text-white/90">
            Connect with local guides and explore hidden gems. Experience authentic culture, adventure, and nature away from the typical tourist path.
          </motion.p>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.9, duration:0.7}} className="mt-8 flex gap-3">
            <a href="#gallery" className="px-6 py-3 rounded-full bg-[#A85D3F] text-white hover:opacity-90 transition">Explore Destinations</a>
            <a href="#features" className="px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 transition">Find a Guide</a>
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="mt-16 text-white/90">
            <p className="uppercase tracking-widest text-xs">Trusted by travelers worldwide</p>
            <div className="mt-4 grid grid-cols-3 gap-8 text-lg">
              <div><div className="text-3xl font-bold">500+</div><div className="text-white/80 text-sm">Verified Guides</div></div>
              <div><div className="text-3xl font-bold">1000+</div><div className="text-white/80 text-sm">Hidden Gems</div></div>
              <div><div className="text-3xl font-bold">2000+</div><div className="text-white/80 text-sm">Happy Travelers</div></div>
            </div>
          </motion.div>
          <motion.div className="absolute bottom-8" animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="text-white" />
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="relative min-h-screen bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-6">
              {galleryImgs.map((src, i) => (
                <motion.div key={i} initial={{opacity:0, x:50}} whileInView={{opacity:1, x:0}} viewport={{ once: true, amount: 0.3 }} transition={{duration:0.6, delay:i*0.15}} className={`relative shrink-0 w-[80vw] md:w-[40vw] h-[60vh] rounded-2xl overflow-hidden shadow-xl ${i%2===0?'-rotate-1':'rotate-1'}`}>
                  <img src={src} alt="Sri Lanka" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              ))}
            </div>
            <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} viewport={{ once: true, amount: 0.5 }} className="absolute inset-0 flex items-center justify-center text-center text-4xl md:text-6xl font-bold text-[#2C2C2C] pointer-events-none">
              <span className="bg-white/70 px-4 py-2 rounded-xl">Experience Sri Lanka Through Local Eyes</span>
            </motion.h2>
          </div>
        </div>
      </section>

      <section id="text-reveal" className="relative min-h-screen bg-black text-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            {"Kandy LK connects travelers with verified local guides, hidden destinations, and authentic Sri Lankan experiences.".split(' ').map((w, i) => (
              <motion.span key={i} className="inline-block text-4xl md:text-6xl font-bold leading-[1.2] mr-3" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                {w}
              </motion.span>
            ))}
          </motion.div>
          <motion.div initial={{opacity:0, scale:0.95}} whileInView={{opacity:1, scale:1}} viewport={{ once: true, amount: 0.4 }} transition={{duration:0.6}} className="rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" alt="Travelers" className="w-full h-[60vh] object-cover" />
          </motion.div>
        </div>
      </section>

      <section id="features" className="bg-[#F5F1E8] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{duration:0.6}} className="text-4xl md:text-5xl font-bold text-center mb-14">Why Choose Kandy LK?</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Verified Local Guides', desc: 'Work with trusted, vetted experts for safe, authentic experiences.' },
              { title: 'Hidden Destinations', desc: 'Discover places beyond the tourist trail, recommended by locals.' },
              { title: 'Authentic Reviews', desc: 'Real feedback from travelers who’ve been there.' },
              { title: 'Business Directory', desc: 'Find restaurants, shops, and stays vetted for quality.' },
            ].map((card, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#A85D3F]" />
                <div className="w-10 h-10 rounded-full bg-[#A85D3F]/10 text-[#A85D3F] flex items-center justify-center mb-4">
                  <Star className="" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-[#6B6B6B]">{card.desc}</p>
                <a href="#" className="mt-4 inline-block text-[#A85D3F]">Learn more →</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="carousel" className="relative h-screen bg-black text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-8 animate-[scroll_60s_linear_infinite]">
            {galleryImgs.concat(galleryImgs).map((src, i) => (
              <div key={i} className="relative w-[60vw] md:w-[40vw] h-[60vh] rounded-2xl overflow-hidden">
                <img src={src} alt="Sri Lanka" className="w-full h-full object-cover opacity-70" />
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h3 className="text-4xl md:text-6xl font-bold">1000+ Hidden Gems<br/>Waiting to Be Discovered</h3>
            <p className="mt-4 text-white/80">scroll to discover</p>
          </div>
        </div>
        <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      <section id="made-for-you" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{duration:0.6}} className="text-4xl md:text-5xl font-bold text-center mb-14">Kandy LK is made for you</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Solo Travelers','Adventure Seekers','Culture Enthusiasts','Family Vacationers','Business Travelers','Local Explorers'
            ].map((label, i) => (
              <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{duration:0.5, delay:(i%3)*0.1}} className="group relative h-72 rounded-2xl overflow-hidden shadow">
                <img src={`https://source.unsplash.com/random/1200x800?travel,${i}`} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 p-6">
                  <div className="w-10 h-1 bg-[#A85D3F] mb-3" />
                  <h3 className="text-2xl font-semibold text-[#2C2C2C]">{label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="bg-[#F5F1E8] py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{duration:0.6}} className="space-y-6">
              {[
                ['500+', 'Verified Guides'],
                ['1000+', 'Hidden Gems'],
                ['2000+', 'Happy Travelers'],
                ['50+', 'Partner Businesses'],
              ].map(([n, label], i) => (
                <div key={i} className="text-[#2C2C2C]">
                  <div className="text-4xl font-extrabold">{n}</div>
                  <div className="text-[#6B6B6B]">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <div>
            <div className="bg-white rounded-2xl p-8 shadow">
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=5" alt="avatar" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">Anna, Germany</div>
                  <div className="text-[#A85D3F]">★★★★★</div>
                </div>
              </div>
              <p className="mt-4 text-[#2C2C2C]">Kandy LK helped us find an incredible local guide who took us to places we would have never discovered on our own. Truly authentic!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative h-[70vh] flex items-center justify-center text-center">
        <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&auto=format&fit=crop" alt="Sri Lanka landscape" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white px-6">
          <h3 className="text-4xl md:text-6xl font-bold">Start Your Sri Lankan Adventure Today</h3>
          <p className="mt-4 text-white/90">Join thousands of travelers discovering the real Sri Lanka</p>
          <div className="mt-8 flex gap-3 justify-center">
            <a href="#" className="px-6 py-3 rounded-full bg-[#A85D3F] text-white hover:opacity-90 transition">Sign Up Free</a>
            <a href="#gallery" className="px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 transition">Browse Destinations</a>
          </div>
          <p className="mt-4 text-white/70 text-sm">No credit card required • Free to join</p>
        </div>
      </section>

      <footer id="contact" className="bg-[#F5F1E8] text-[#2C2C2C] pt-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div>
            <div className="text-xl font-semibold">Kandy LK</div>
            <p className="mt-3 text-[#6B6B6B]">Connecting travelers with verified guides, local businesses, and hidden destinations across Sri Lanka.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Quick Links</div>
            <ul className="space-y-2 text-[#6B6B6B]">
              <li><a href="#gallery" className="hover:underline">Destinations</a></li>
              <li><a href="#features" className="hover:underline">Guides</a></li>
              <li><a href="#hero" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">For Guides</div>
            <ul className="space-y-2 text-[#6B6B6B]">
              <li><a href="#" className="hover:underline">Become a Guide</a></li>
              <li><a href="#" className="hover:underline">Partner With Us</a></li>
              <li><a href="#" className="hover:underline">Resources</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Newsletter</div>
            <form className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ring-[#A85D3F]" />
              <button className="px-5 py-3 rounded-xl bg-[#A85D3F] text-white">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-black/10">
          <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-[#6B6B6B] flex flex-col md:flex-row items-center justify-between">
            <p>© {new Date().getFullYear()} Kandy LK • Privacy • Terms • Made with ♥ in Sri Lanka</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
