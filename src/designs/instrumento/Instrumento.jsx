import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import { club, copy, images } from '../../content.js'
import WhatsAppFab from '../../components/WhatsAppFab.jsx'
import './instrumento.css'

const MAX_DEPTH = 28

const milestones = [
  {
    image: images.underwaterPushoff,
    depth: 6,
    line: 'PREPARACIÓN',
    sub: `Entrenador: ${club.coach}`,
  },
  {
    image: images.teamGroup,
    depth: 16,
    line: 'TÉCNICA',
    sub: 'Aletas, respiración, control.',
  },
  {
    image: images.portraitWetsuit,
    depth: MAX_DEPTH,
    line: 'RENDIMIENTO',
    sub: 'Apnea dinámica y estática, en grupo.',
  },
]

function useElapsed() {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf
    const tick = (t) => {
      setElapsed((t - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return elapsed
}

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function Instrumento() {
  const barFillRef = useRef(null)
  const depthReadRef = useRef(null)
  const progressPctRef = useRef(null)
  const stageRef = useRef(null)
  const dialRef = useRef(null)
  const dialNumberRef = useRef(null)
  const stopRefs = useRef([])
  const elapsed = useElapsed()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Persistent top HUD: depth readout tied to whole-page scroll
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const depth = (self.progress * MAX_DEPTH).toFixed(1)
          if (depthReadRef.current) depthReadRef.current.textContent = `-${depth} M`
          if (progressPctRef.current) progressPctRef.current.textContent = `${Math.round(self.progress * 100)}%`
          if (barFillRef.current) barFillRef.current.style.width = `${self.progress * 100}%`
        },
      })

      gsap.fromTo(
        '.instr-hero-title',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.2 : 1, ease: 'power2.out', delay: 0.15 },
      )
      gsap.fromTo(
        '.instr-hero-kicker, .instr-corners span',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: reduceMotion ? 0.2 : 0.8, stagger: 0.05, delay: 0.05 },
      )

      if (reduceMotion) {
        gsap.set('.stop-img', { autoAlpha: 1 })
        gsap.set('.reveal, .stop-text > *', { autoAlpha: 1, y: 0 })
        return
      }

      // Reveals
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 84%' } },
        )
      })

      // Pinned gauge sequence
      const circumference = 2 * Math.PI * 54
      gsap.set(dialRef.current, { strokeDasharray: circumference, strokeDashoffset: circumference })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: `+=${milestones.length * 100}%`,
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            const p = self.progress
            const depth = p * MAX_DEPTH
            gsap.set(dialRef.current, { strokeDashoffset: circumference * (1 - p) })
            if (dialNumberRef.current) dialNumberRef.current.textContent = depth.toFixed(1)
          },
        },
      })

      stopRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(el.querySelector('.stop-img'), { autoAlpha: 1, duration: 0.5 }, i - 0.4)
        tl.fromTo(
          el.querySelectorAll('.stop-text > *'),
          { autoAlpha: 0, x: 24 },
          { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.06 },
          i - 0.25,
        )
        if (i < milestones.length - 1) {
          tl.to(el.querySelector('.stop-img'), { autoAlpha: 0, duration: 0.4 }, i + 0.55)
          tl.to(el.querySelectorAll('.stop-text > *'), { autoAlpha: 0, duration: 0.3 }, i + 0.55)
        }
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="instr">
      <div className="instr-hud">
        <div className="instr-hud-left">
          <img src={images.logo} alt="" />
          <span>INVICTUS_APNEA.SYS</span>
        </div>
        <div className="instr-hud-bar">
          <div ref={barFillRef} className="instr-hud-bar-fill" />
        </div>
        <div className="instr-hud-right">
          <span>T+ {formatTime(elapsed)}</span>
          <span ref={progressPctRef}>0%</span>
          <span ref={depthReadRef}>-0.0 M</span>
        </div>
      </div>

      <section className="instr-hero">
        <div className="instr-hero-bg duotone">
          <img src={images.underwaterFinkick} alt="Atleta de Invictus Apnea bajo el agua" />
        </div>
        <div className="instr-corners">
          <span className="c tl" />
          <span className="c tr" />
          <span className="c bl" />
          <span className="c br" />
        </div>
        <div className="instr-hero-copy">
          <p className="instr-hero-kicker">// {copy.kicker.toUpperCase()} · {club.city.toUpperCase()}</p>
          <h1 className="instr-hero-title">INVICTUS<span>APNEA</span></h1>
        </div>
        <div className="instr-scroll-cue">
          <span>SCROLL</span>
          <div className="chev" />
        </div>
      </section>

      <div className="instr-ticker">
        <div className="instr-ticker-track">
          {Array(3)
            .fill(0)
            .flatMap((_, k) => [
              <span key={`a${k}`}>{club.venue.toUpperCase()}</span>,
              <span key={`b${k}`}>{club.city.toUpperCase()}</span>,
              <span key={`c${k}`}>ENTRENADOR · {club.coach.toUpperCase()}</span>,
              <span key={`d${k}`}>APNEA DINÁMICA</span>,
              <span key={`e${k}`}>APNEA ESTÁTICA</span>,
            ])}
        </div>
      </div>

      <section className="instr-panel reveal">
        <div className="panel-frame">
          <span className="panel-label">// SOBRE EL CLUB</span>
          <p>{copy.about}</p>
        </div>
        <div className="panel-media duotone">
          <img src={images.groupPoolEdge} alt="Miembros de Invictus Apnea en la piscina" />
        </div>
      </section>

      <section className="instr-profile reveal">
        <div className="panel-media duotone profile-media">
          <img src={images.portraitWetsuit} alt={club.coach} />
          <div className="profile-tag">
            <span className="c tl" />
            <span className="c br" />
            ENTRENADOR
          </div>
        </div>
        <div className="panel-frame">
          <span className="panel-label">// EQUIPO TÉCNICO</span>
          <h3>{club.coach}</h3>
          <p>{copy.training}</p>
          <p className="instr-venue">{club.venue} · {club.city}</p>
        </div>
      </section>

      <section ref={stageRef} className="instr-stage">
        <div className="instr-stage-grid" />
        <div className="instr-dial-wrap">
          <svg viewBox="0 0 120 120" className="instr-dial">
            <circle cx="60" cy="60" r="54" className="dial-track" />
            <circle ref={dialRef} cx="60" cy="60" r="54" className="dial-fill" />
          </svg>
          <div className="instr-dial-readout">
            <span ref={dialNumberRef}>0.0</span>
            <small>METROS</small>
          </div>
        </div>
        {milestones.map((m, i) => (
          <div key={m.line} ref={(el) => (stopRefs.current[i] = el)} className="instr-stop">
            <div className="stop-img duotone" style={{ opacity: i === 0 ? 1 : 0 }}>
              <img src={m.image} alt="" />
            </div>
            <div className="stop-text">
              <span className="panel-label">// FASE {i + 1}</span>
              <h2>{m.line}</h2>
              <p>{m.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="instr-gallery reveal">
        <span className="panel-label center">// REGISTRO VISUAL</span>
        <div className="instr-gallery-grid">
          <div className="g-item wide">
            <video src={images.video} autoPlay muted loop playsInline />
            <span className="g-tag">● REC</span>
          </div>
          <div className="g-item">
            <img src={images.underwaterFinkick} alt="" />
          </div>
          <div className="g-item">
            <img src={images.teamGroup} alt="" />
          </div>
          <div className="g-item">
            <img src={images.underwaterPushoff} alt="" />
          </div>
          <div className="g-item">
            <img src={images.memberFloral} alt="" />
          </div>
          <div className="g-item wide">
            <video src={images.videoPoolEdge} autoPlay muted loop playsInline />
            <span className="g-tag">● REC</span>
          </div>
          <div className="g-item">
            <video src={images.videoBoat} autoPlay muted loop playsInline />
            <span className="g-tag">● REC</span>
          </div>
        </div>
      </section>

      <section className="instr-cta reveal">
        <div className="panel-frame cta-frame">
          <span className="panel-label">// CONTACTO</span>
          <h2>{copy.ctaLead}</h2>
          <p>{copy.ctaBody}</p>
          <a className="instr-cta-btn" href={club.whatsappLink} target="_blank" rel="noopener noreferrer">
            <span className="dot" /> ESCRIBIR · {club.whatsappDisplay}
          </a>
        </div>
      </section>

      <footer className="instr-footer">
        <span>{club.name.toUpperCase()}</span>
        <span>{club.venue}, {club.city}</span>
      </footer>

      <WhatsAppFab className="instr-fab" />
    </div>
  )
}
