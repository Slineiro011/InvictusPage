import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import { club, copy, images } from '../../content.js'
import WhatsAppFab from '../../components/WhatsAppFab.jsx'
import './bandera.css'

export default function Bandera() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ban-hero-mark',
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.2 : 1.1, ease: 'power3.out', delay: 0.25 },
      )
      gsap.fromTo(
        '.ban-hero-badge, .ban-hero-kicker',
        { autoAlpha: 0, scale: 0.85 },
        { autoAlpha: 1, scale: 1, duration: reduceMotion ? 0.2 : 0.8, stagger: 0.1, ease: 'back.out(2)' },
      )

      if (reduceMotion) {
        gsap.set('.curtain', { display: 'none' })
        gsap.set('.reveal', { autoAlpha: 1, y: 0 })
        return
      }

      // Diagonal curtain wipes
      gsap.utils.toArray('.curtain').forEach((el) => {
        gsap.to(el, {
          xPercent: -130,
          ease: 'power3.inOut',
          duration: 1,
          scrollTrigger: { trigger: el.parentElement, start: 'top 78%' },
        })
      })

      // Content reveals
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 46 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.25,
            scrollTrigger: { trigger: el, start: 'top 82%' },
          },
        )
      })

      // Big numerals count up
      gsap.utils.toArray('.count-up').forEach((el) => {
        const target = Number(el.dataset.target)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.2,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => (el.textContent = String(Math.round(obj.v)).padStart(2, '0')),
        })
      })

      // Gallery stagger
      gsap.fromTo(
        '.ban-gallery .g-tile',
        { autoAlpha: 0, y: 40, rotate: -2 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.ban-gallery', start: 'top 80%' },
        },
      )

      ScrollTrigger.refresh()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="ban" ref={rootRef}>
      <section className="ban-hero">
        <div className="ban-hero-stripe" />
        <img className="ban-hero-badge" src={images.logo} alt="Invictus Apnea" />
        <p className="ban-hero-kicker">CLUB DEPORTIVO · PEREIRA, COLOMBIA</p>
        <h1 className="ban-hero-mark">
          INVICTUS
          <br />
          APNEA
        </h1>
        <div className="ban-scroll-cue">
          <span>BAJA</span>
          <div className="arrow" />
        </div>
      </section>

      <section className="ban-section">
        <div className="curtain" />
        <div className="ban-section-inner reveal">
          <span className="ban-num count-up" data-target="1">
            00
          </span>
          <div className="ban-section-body">
            <h2>EL CLUB</h2>
            <p>{copy.about}</p>
          </div>
          <div className="ban-section-media">
            <img src={images.teamGroup} alt="Equipo de Invictus Apnea en la piscina" />
          </div>
        </div>
      </section>

      <section className="ban-section alt">
        <div className="curtain curtain-alt" />
        <div className="ban-section-inner reveal">
          <span className="ban-num count-up" data-target="2">
            00
          </span>
          <div className="ban-section-media">
            <img src={images.portraitWetsuit} alt={club.coach} />
          </div>
          <div className="ban-section-body">
            <h2>ENTRENAMIENTO</h2>
            <p>{copy.training}</p>
            <p className="ban-venue">{club.venue} · {club.city}</p>
          </div>
        </div>
      </section>

      <section className="ban-gallery">
        <div className="ban-gallery-head reveal">
          <span className="ban-num count-up" data-target="3">
            00
          </span>
          <h2>GALERÍA</h2>
        </div>
        <div className="ban-gallery-grid">
          <div className="g-tile wide">
            <video src={images.video} autoPlay muted loop playsInline />
            <span className="lane">1</span>
          </div>
          <div className="g-tile">
            <img src={images.underwaterFinkick} alt="" />
            <span className="lane">2</span>
          </div>
          <div className="g-tile">
            <img src={images.groupPoolEdge} alt="" />
            <span className="lane">3</span>
          </div>
          <div className="g-tile">
            <img src={images.underwaterPushoff} alt="" />
            <span className="lane">4</span>
          </div>
          <div className="g-tile">
            <img src={images.memberFloral} alt="" />
            <span className="lane">5</span>
          </div>
          <div className="g-tile wide">
            <video src={images.videoPoolEdge} autoPlay muted loop playsInline />
            <span className="lane">6</span>
          </div>
          <div className="g-tile">
            <video src={images.videoBoat} autoPlay muted loop playsInline />
            <span className="lane">7</span>
          </div>
          <div className="g-tile">
            <video src={images.videoOpenWaterTow} autoPlay muted loop playsInline />
            <span className="lane">8</span>
          </div>
        </div>
      </section>

      <section className="ban-cta reveal">
        <p className="ban-cta-kicker">¿LISTO PARA BAJAR?</p>
        <h2>{copy.ctaLead}</h2>
        <p className="ban-cta-body">{copy.ctaBody}</p>
        <a className="ban-cta-btn" href={club.whatsappLink} target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp — {club.whatsappDisplay}
        </a>
      </section>

      <footer className="ban-footer">
        <img src={images.logo} alt="" />
        <div>
          <strong>{club.name}</strong>
          <span>{club.venue}, {club.city}</span>
        </div>
      </footer>

      <WhatsAppFab className="ban-fab" />
    </div>
  )
}
