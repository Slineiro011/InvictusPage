import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import { club, copy, images } from '../../content.js'
import WhatsAppFab from '../../components/WhatsAppFab.jsx'
import Shark from './Shark.jsx'
import './profundidad.css'

const MAX_DEPTH = 30

const beats = [
  {
    image: images.teamGroup,
    bg: '#0b2a55',
    phase: 'Preparación',
    line: 'Un club real.',
    sub: `Entrenamos en el ${club.venue}, ${club.city}.`,
  },
  {
    image: images.underwaterPushoff,
    bg: '#0a1c3c',
    phase: 'Técnica',
    line: 'Técnica. Respiración. Control.',
    sub: `Dirige las sesiones el entrenador ${club.coach}.`,
  },
  {
    image: images.portraitWetsuit,
    bg: '#050b18',
    phase: 'Rendimiento',
    line: 'Bajamos juntos.',
    sub: 'Apnea dinámica, estática y con aletas, en grupo.',
  },
]

export default function Profundidad() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const bgRef = useRef(null)
  const beatRefs = useRef([])
  const galleryRef = useRef(null)
  const trackRef = useRef(null)
  const dialRef = useRef(null)
  const dialNumberRef = useRef(null)
  const leftSharkRef = useRef(null)
  const rightSharkRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '.prof-hero-mark',
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.3 : 1.4, ease: 'power3.out', delay: 0.2 },
      )
      gsap.fromTo(
        '.prof-hero-kicker',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.3 : 1, ease: 'power2.out', delay: 0.1 },
      )

      if (reduceMotion) {
        gsap.set('.beat-img', { autoAlpha: 1 })
        gsap.set('.beat-text > *', { autoAlpha: 1, y: 0 })
        gsap.utils.toArray('.reveal').forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }))
        return
      }

      // Pinned descent sequence
      const colors = beats.map((b) => b.bg)
      const circumference = 2 * Math.PI * 54
      gsap.set(dialRef.current, { strokeDasharray: circumference, strokeDashoffset: circumference })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: `+=${beats.length * 100}%`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const depth = self.progress * MAX_DEPTH
            gsap.set(dialRef.current, { strokeDashoffset: circumference * (1 - self.progress) })
            if (dialNumberRef.current) dialNumberRef.current.textContent = depth.toFixed(1)
          },
        },
      })

      beatRefs.current.forEach((el, i) => {
        if (!el) return
        if (i > 0) tl.to(bgRef.current, { backgroundColor: colors[i], duration: 1, ease: 'none' }, i - 0.35)
        tl.to(
          el.querySelector('.beat-img'),
          { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 0.6, ease: 'none' },
          i - 0.4,
        )
        tl.fromTo(
          el.querySelectorAll('.beat-text > *'),
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          i - 0.25,
        )
        if (i < beats.length - 1) {
          tl.to(
            el.querySelector('.beat-img'),
            { autoAlpha: 0, filter: 'blur(14px)', duration: 0.5, ease: 'none' },
            i + 0.55,
          )
          tl.to(el.querySelectorAll('.beat-text > *'), { autoAlpha: 0, y: -20, duration: 0.4 }, i + 0.55)
        }
      })

      // Horizontal gallery
      if (trackRef.current) {
        const track = trackRef.current
        const distance = () => track.scrollWidth - window.innerWidth

        const bite = (sharkEl) => {
          if (!sharkEl) return
          sharkEl.classList.remove('is-biting')
          void sharkEl.offsetWidth
          sharkEl.classList.add('is-biting')
        }

        let exitedLeft = 0
        let enteredRight = 0
        const biteZone = 48

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const items = track.children
              let exited = 0
              let entered = 0
              for (const item of items) {
                const r = item.getBoundingClientRect()
                if (r.right <= biteZone) exited++
                if (r.left <= window.innerWidth - biteZone) entered++
              }
              if (exited > exitedLeft) bite(leftSharkRef.current)
              if (entered > enteredRight) bite(rightSharkRef.current)
              exitedLeft = exited
              enteredRight = entered
            },
          },
        })
      }

      // Simple reveals for normal-flow sections
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        )
      })

      ScrollTrigger.refresh()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="prof" ref={rootRef}>
      <section className="prof-hero">
        <img className="prof-hero-bg" src={images.underwaterFinkick} alt="Atleta de Invictus Apnea en descenso bajo el agua" />
        <div className="prof-hero-veil" />
        <img className="prof-hero-logo" src={images.logo} alt="" />
        <p className="prof-hero-kicker">{copy.kicker} · {club.city}</p>
        <h1 className="prof-hero-mark">
          INVICTUS<br />APNEA
        </h1>
        <div className="prof-scroll-cue">
          <span />
          desliza
        </div>
      </section>

      <section ref={stageRef} className="prof-stage">
        <div ref={bgRef} className="prof-stage-bg" style={{ backgroundColor: beats[0].bg }} />
        {beats.map((b, i) => (
          <div
            key={b.line}
            ref={(el) => (beatRefs.current[i] = el)}
            className="prof-beat"
          >
            <img
              className="beat-img"
              src={b.image}
              alt=""
              style={{ opacity: i === 0 ? 1 : 0, filter: i === 0 ? 'blur(0px)' : 'blur(14px)' }}
            />
            <div className="beat-img-veil" />
            <div className="beat-text">
              <span className="beat-phase">// FASE {i + 1}</span>
              <h2>{b.line}</h2>
              <p>{b.sub}</p>
            </div>
          </div>
        ))}
        <div className="prof-dial-wrap">
          <svg viewBox="0 0 120 120" className="prof-dial">
            <circle cx="60" cy="60" r="54" className="dial-track" />
            <circle ref={dialRef} cx="60" cy="60" r="54" className="dial-fill" />
          </svg>
          <div className="prof-dial-readout">
            <span ref={dialNumberRef}>0.0</span>
            <small>METROS</small>
          </div>
        </div>
      </section>

      <section className="prof-about reveal">
        <div className="prof-about-copy">
          <span className="eyebrow">Quiénes somos</span>
          <p>{copy.about}</p>
        </div>
      </section>

      <section className="prof-training reveal">
        <img src={images.groupPoolEdge} alt="Miembros de Invictus Apnea en el borde de la piscina" />
        <div className="prof-training-copy">
          <span className="eyebrow">Entrenamiento</span>
          <p>{copy.training}</p>
          <p className="prof-venue">{club.venue} · {club.city}</p>
        </div>
      </section>

      <section ref={galleryRef} className="prof-gallery">
        <Shark side="left" wrapRef={leftSharkRef} />
        <Shark side="right" wrapRef={rightSharkRef} />
        <div ref={trackRef} className="prof-gallery-track">
          <div className="gallery-item wide">
            <video src={images.video} autoPlay muted loop playsInline />
          </div>
          <div className="gallery-item">
            <img src={images.underwaterFinkick} alt="" />
          </div>
          <div className="gallery-item wide">
            <video src={images.videoPoolEdge} autoPlay muted loop playsInline />
          </div>
          <div className="gallery-item">
            <img src={images.portraitWetsuit} alt="" />
          </div>
          <div className="gallery-item">
            <img src={images.memberFloral} alt="" />
          </div>
          <div className="gallery-item wide">
            <img src={images.teamGroup} alt="" />
          </div>
          <div className="gallery-item">
            <video src={images.videoBoat} autoPlay muted loop playsInline />
          </div>
          <div className="gallery-item">
            <img src={images.underwaterPushoff} alt="" />
          </div>
          <div className="gallery-item narrow">
            <video src={images.videoOpenWaterTow} autoPlay muted loop playsInline />
          </div>
        </div>
      </section>

      <section className="prof-cta reveal">
        <img className="prof-cta-logo" src={images.logo} alt="Invictus Apnea" />
        <h2>{copy.ctaLead}</h2>
        <p>{copy.ctaBody}</p>
        <a className="prof-cta-btn" href={club.whatsappLink} target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp — {club.whatsappDisplay}
        </a>
      </section>

      <footer className="prof-footer">
        <span>{club.name}</span>
        <span>{club.venue}, {club.city}</span>
      </footer>

      <WhatsAppFab className="prof-fab" />
    </div>
  )
}
