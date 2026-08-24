import { Link } from 'react-router-dom'
import { images } from '../content.js'

const options = [
  {
    to: '/profundidad',
    name: 'Profundidad',
    tag: 'Cine · descenso',
    desc: 'Fotografía a pantalla completa, tipografía enorme y un scroll que te hunde de la superficie a la profundidad, como un tráiler.',
    accent: '#0a2a5e',
  },
  {
    to: '/instrumento',
    name: 'Instrumento',
    tag: 'HUD · dive computer',
    desc: 'Estética de computadora de buceo: retículas, datos de profundidad y tiempo que corren mientras avanzas.',
    accent: '#00b7ff',
  },
  {
    to: '/bandera',
    name: 'Bandera',
    tag: 'Póster · gráfico',
    desc: 'El lenguaje de la bandera de buzo del club llevado a cartel deportivo: bloques, diagonales, tipografía de bloque.',
    accent: '#e3212b',
  },
]

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05070d',
        color: '#f3f6fb',
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: '6vw 6vw 4vw',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '5vw' }}>
        <img src={images.logo} alt="Invictus Apnea" style={{ width: 56, height: 'auto', borderRadius: 10 }} />
        <div>
          <p style={{ margin: 0, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.55 }}>
            Invictus Apnea — vista de propuestas
          </p>
          <h1 style={{ margin: '4px 0 0', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700 }}>
            Elige un diseño para revisar
          </h1>
        </div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5vw',
        }}
      >
        {options.map((o) => (
          <Link
            key={o.to}
            to={o.to}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '2vw',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderColor = o.accent
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: o.accent,
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              {o.tag}
            </span>
            <h2 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 700 }}>{o.name}</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, opacity: 0.75 }}>{o.desc}</p>
            <span style={{ display: 'inline-block', marginTop: 18, fontSize: 14, fontWeight: 600, color: o.accent }}>
              Ver diseño →
            </span>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: '4vw', fontSize: 13, opacity: 0.4 }}>
        Página interna solo para comparar propuestas — no es parte del sitio final.
      </p>
    </div>
  )
}
