import { useEffect, useState } from "react";
import HeroSequence from "./HeroSequence.jsx";
import useReveal from "./useReveal.js";

const FEATURES = [
  {
    index: "01",
    title: "Switches",
    desc: "Vorgefertigte taktile Switches mit linearer Betätigung und konsistentem Feedback — für Millionen saubere Anschläge.",
  },
  {
    index: "02",
    title: "Keycap-Material",
    desc: "Doubleshot-PBT-Keycaps mit abrasionsfester Oberflächenstruktur. Kein Einbrennen, kein Glänzen.",
  },
  {
    index: "03",
    title: "Konnektivität",
    desc: "Bluetooth 5.1, USB-C und 2,4-GHz-Dongle. Drei Geräte parallel, nahtlos umschaltbar.",
  },
  {
    index: "04",
    title: "Akkulaufzeit",
    desc: "Bis zu 90 Tage am Stück. Ein einzelner Ladevorgang genügt für Monate ungestörten Schreibens.",
  },
];

const SPECS = [
  { label: "Layout", value: "75% · 84 Tasten" },
  { label: "Gehäuse", value: "CNC-gefrästes Aluminium" },
  { label: "Switch-Typ", value: "Taktile · 50 gf" },
  { label: "Keycaps", value: "Doubleshot PBT" },
  { label: "Anschluss", value: "USB-C · BT 5.1 · 2,4 GHz" },
  { label: "Akku", value: "4000 mAh · bis 90 Tage" },
  { label: "Polling-Rate", value: "1000 Hz (kabelgebunden)" },
  { label: "Gewicht", value: "1,18 kg" },
  { label: "Abmessungen", value: "320 × 137 × 32 mm" },
  { label: "Programmierung", value: "QMK / VIA kompatibel" },
];

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const revealHeadline = useReveal();
  const revealLead = useReveal();
  const revealFeatures = useReveal();
  const revealSpecs = useReveal();
  const revealStatement = useReveal();
  const revealCta = useReveal();

  return (
    <>
      <nav className={`nav ${navScrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__brand">
          Lumen<span>.</span>
        </div>
        <div className="nav__links">
          <a href="#features">Features</a>
          <a href="#specs">Specs</a>
          <a href="#statement">Design</a>
        </div>
        <a href="#cta" className="nav__cta">
          Vorbestellen
        </a>
      </nav>

      <HeroSequence />

      <main>
        {/* Headline + subline */}
        <section className="section headline-block">
          <div className="container">
            <p className="eyebrow reveal" ref={revealHeadline}>
              Lumen One
            </p>
            <h2 className="h-section reveal reveal--delay-1" ref={revealLead}>
              Mechanik, die man spürt.
              <br />
              Präzision, die man sieht.
            </h2>
            <p className="lead reveal reveal--delay-2">
              Jede Taste ein bewusst gesetzter Punkt. Jedes Bauteil auf seine
              Funktion reduziert. Die Lumen One ist keine Tastatur, die man
              erklärt — sondern eine, die man versteht, sobald man sie
              berührt.
            </p>
          </div>
        </section>

        {/* Feature grid */}
        <section className="section" id="features">
          <div className="container">
            <div className="features reveal" ref={revealFeatures}>
              {FEATURES.map((f) => (
                <div className="feature" key={f.index}>
                  <span className="feature__index">{f.index}</span>
                  <h3 className="feature__title">{f.title}</h3>
                  <p className="feature__desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="section" id="specs">
          <div className="container">
            <div className="reveal" ref={revealSpecs}>
              <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
                Technische Daten
              </p>
              <div className="specs">
                {SPECS.map((s) => (
                  <div className="spec-row" key={s.label}>
                    <span className="spec-row__label">{s.label}</span>
                    <span className="spec-row__value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Statement image */}
        <section className="statement reveal" id="statement" ref={revealStatement}>
          <img
            className="statement__img"
            src="/frames/frame_0120.jpg"
            alt="Lumen One Tastatur — zerlegt in ihre Einzelteile"
            loading="lazy"
          />
          <div className="statement__caption">
            <p className="eyebrow">Im Detail</p>
            <h2 className="h-section">Fünf Ebenen. Ein Gefühl.</h2>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta" id="cta">
          <div className="container reveal" ref={revealCta}>
            <h2 className="h-section">Bereit, anders zu tippen?</h2>
            <p className="lead">
              Die erste Charge der Lumen One ist streng limitiert. Sichere dir
              dein Exemplar jetzt — Versand beginnt im nächsten Quartal.
            </p>
            <a href="#" className="btn-primary">
              Jetzt vorbestellen
              <span className="btn-primary__arrow">→</span>
            </a>
            <p className="cta__note">
              30 Tage Rückgaberecht · Kostenloser Versand · 2 Jahre Garantie
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div
          className="container"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="footer__brand">Lumen</span>
          <span>Entworfen für die, die genau tippen.</span>
        </div>
      </footer>
    </>
  );
}
