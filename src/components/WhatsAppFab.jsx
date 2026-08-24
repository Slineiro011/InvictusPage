import { club } from '../content.js'

export default function WhatsAppFab({ style, className }) {
  return (
    <a
      href={club.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Escribir por WhatsApp a Invictus Apnea"
      style={style}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.36a9.9 9.9 0 0 0 4.64 1.15h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.06.28-3.55-.74-2.98-1.23-4.9-4.24-5.05-4.44-.15-.2-1.2-1.6-1.2-3.06 0-1.45.76-2.17 1.03-2.47.27-.29.6-.36.8-.36.2 0 .4.002.57.01.18.008.43-.07.68.51.24.6.83 2.06.9 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.3.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.24 1.63 2 1.12.99 2.05 1.3 2.36 1.45.3.15.48.13.66-.07.18-.2.75-.86.95-1.15.2-.3.4-.24.68-.14.28.1 1.76.82 2.06.97.3.15.5.22.57.35.08.13.08.75-.16 1.43Z" />
      </svg>
      <span>Escríbenos</span>
    </a>
  )
}
