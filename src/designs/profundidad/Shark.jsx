export default function Shark({ side, wrapRef }) {
  return (
    <div className={`prof-shark prof-shark-${side}`} ref={wrapRef} aria-hidden="true">
      <svg viewBox="0 0 220 100" className="prof-shark-svg">
        <g className="shark-tail">
          <path d="M12,55 L-16,33 L1,55 L-16,79 Z" />
        </g>
        <path
          className="shark-body"
          d="M10,55 C25,20 90,7 150,13 C185,16 206,29 214,45 C209,52 199,55 187,54 C146,67 74,73 31,65 C18,62 10,59 10,55 Z"
        />
        <path className="shark-fin" d="M96,16 L112,-17 L130,18 Z" />
        <path className="shark-fin shark-fin-belly" d="M104,64 L119,91 L141,66 Z" />
        <g className="shark-jaw">
          <path d="M187,54 C197,55 206,50 211,46 C207,59 197,69 183,71 C179,68 181,60 187,54 Z" />
          <polygon className="shark-teeth" points="188,55 192,61 196,55 200,61 204,55 208,60 205,50 189,52" />
        </g>
        <polygon className="shark-teeth shark-teeth-upper" points="150,53 154,47 158,53 162,47 166,53 170,47 174,53 176,45 148,45" />
        <circle className="shark-eye" cx="172" cy="31" r="6.5" />
        <circle className="shark-pupil" cx="174" cy="31" r="3.2" />
      </svg>
    </div>
  )
}
