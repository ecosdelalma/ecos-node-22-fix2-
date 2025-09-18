import Link from 'next/link';
export default function Home(){ return (
  <section className="relative min-h-[90vh] rounded-2xl overflow-hidden ecos-glow">
    <video className="absolute inset-0 w-full h-full object-cover" src="/background.mp4" autoPlay muted loop playsInline preload="metadata" />
    <div className="hero-overlay" />
    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-0 text-white text-center lowercase tracking-wider"
        style={{ fontSize: 'clamp(42px,10vw,120px)', textShadow:'0 2px 20px rgba(0,0,0,.45)' }}>ecos</h1>
    <div className="relative z-10 p-6 flex justify-center gap-3">
      <Link className="ecos-primary" href="/signup">be ecos</Link>
      <Link className="ecos-ghost" href="/login">ya tengo cuenta</Link>
    </div>
  </section> ); }
