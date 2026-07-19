import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 150;
const FRAME_PATH = (i) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

/**
 * Scroll-driven image-sequence hero.
 * - Preloads all 150 frames with a subtle progress indicator.
 * - Draws the active frame onto a <canvas> in "cover" mode.
 * - Sticky canvas inside a 300vh container; frame index = scroll % * 150.
 * - Uses requestAnimationFrame; no React re-render per scroll event.
 */
export default function HeroSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const loaderRef = useRef(null);
  const imagesRef = useRef([]);
  const rafRef = useRef(null);
  const currentFrameRef = useRef(0);

  const [progress, setProgress] = useState(0);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const imgs = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = img.onerror = () => {
        loaded++;
        setProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT && loaderRef.current) {
          loaderRef.current.classList.add("hero__loader--hidden");
          // draw first frame once ready
          drawCoverFrame(0);
        }
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  // Setup canvas sizing (HiDPI aware)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      drawCoverFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Scroll handler (rAF-throttled)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = container.getBoundingClientRect();
        const scrollable = container.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
        const pct = scrollable > 0 ? scrolled / scrollable : 0;
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(pct * FRAME_COUNT)
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawCoverFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Draw a frame in "cover" mode (full bleed, no distortion)
  function drawCoverFrame(index) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  return (
    <section className="hero" ref={containerRef} aria-label="Produktanimation">
      <div className="hero__sticky">
        <canvas className="hero__canvas" ref={canvasRef} />

        <div className="hero__overlay">
          <p className="eyebrow">Lumen Keyboard</p>
          <h1 className="h-display">Präzision in jeder Ebene.</h1>
          <p className="lead">
            Eine mechanische Tastatur, die bis ins letzte Bauteil durchdacht ist.
          </p>
        </div>

        <div className="hero__hint">
          <span>Scrollen</span>
          <span className="hero__hint-line" />
        </div>

        <div className="hero__loader" ref={loaderRef}>
          <div className="hero__loader-text">{progress}%</div>
          <div className="hero__loader-bar">
            <div
              className="hero__loader-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
