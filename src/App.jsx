
import { useState, useEffect } from "react";
import { ArrowRight, Search, ShoppingBag, Play, Droplets } from "lucide-react";
import "./index.css";
import SkinDiscovery from "./SkinDiscovery";

const serums = {
  pink: {
    name: "HYDRATION",
    color: "#f39bc2",
    liquidColor: "#ff75b7",
    title: "YOUR SKIN.\nYOUR SCIENCE.\nYOUR AURA.",
    benefit: "A fresh wave of hydration.",
    liquid: "Rose Water Essence",
  },
  amber: {
    name: "RADIANCE",
    color: "#efb365",
    liquidColor: "#ffad42",
    title: "LET YOUR\nNATURAL GLOW\nSHINE.",
    benefit: "Meet your everyday glow.",
    liquid: "Golden Glow Essence",
  },
  blue: {
    name: "SOOTHING",
    color: "#8dc9f5",
    liquidColor: "#55baff",
    title: "CALM SKIN.\nCLEAR MIND.\nPURE AURA.",
    benefit: "A softer, calmer ritual.",
    liquid: "Blue Calm Essence",
  },
  green: {
    name: "BALANCING",
    color: "#53d878",
    liquidColor: "#ff75b7",
    title: "FIND YOUR\nNATURAL\nBALANCE.",
    benefit: "Your skin, in harmony.",
    liquid: "Botanical Balance",
  },
};

const serumIngredients = {
  pink: [
    ["01", "Hyaluronic Acid", "Helps skin retain moisture"],
    ["02", "Glycerin", "Draws moisture into the skin"],
    ["03", "Panthenol", "Supports the skin barrier"],
    ["04", "Aloe Vera", "A soothing hydration ritual"],
  ],
  amber: [
    ["01", "Vitamin C", "Helps brighten dull-looking skin"],
    ["02", "Vitamin E", "Antioxidant skincare support"],
    ["03", "Ferulic Acid", "Antioxidant-focused care"],
    ["04", "Licorice Extract", "Helps improve uneven-looking tone"],
  ],
  blue: [
    ["01", "Centella Asiatica", "Soothing skincare support"],
    ["02", "Panthenol", "Helps support the skin barrier"],
    ["03", "Allantoin", "Comfort for stressed-looking skin"],
    ["04", "Hyaluronic Acid", "Helps maintain hydration"],
  ],
  green: [
    ["01", "Niacinamide", "Helps balance the look of oily skin"],
    ["02", "Zinc PCA", "Oil-balance skincare support"],
    ["03", "Green Tea Extract", "Antioxidant botanical care"],
    ["04", "Willow Bark Extract", "A balancing skincare concept"],
  ],
};



export default function App() {
  const [active, setActive] = useState(() => {
  const requestedSerum =
    new URLSearchParams(window.location.search).get("serum");

  return ["pink", "amber", "blue", "green"].includes(requestedSerum)
    ? requestedSerum
    : "pink";
});
const [ritualStep, setRitualStep] = useState("cleanse");

const handleRitualVideoTime = (e) => {
  const time = e.currentTarget.currentTime;

  // Example timings — apne video ke scenes ke according adjust karna
  if (time < 3) {
    setRitualStep("cleanse");
  } else if (time < 8) {
    setRitualStep("apply");
  } else {
    setRitualStep("glow");
  }
};
useEffect(() => {
  if (window.location.search.includes("serum=")) {
    const timer = setTimeout(() => {
      document.getElementById("serums")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);

    return () => clearTimeout(timer);
  }
}, []);
  const [ritualOpen, setRitualOpen] = useState(false);
  const serum = serums[active];

const [ritualLine, setRitualLine] = useState(0);

const videoFiles = [
  "/skinaura-pink-model.mp4",
  "/skinaura-amber-model.mp4",
  "/skinaura-blue-model.mp4",
  "/skinaura-green-model.mp4",

  "/ritual-drops.mp4",
  "/amber-drops.mp4",
  "/blue-drops.mp4",
  "/green-drops.mp4",

  "/skinaura-final-bg.mp4",
  "/skinaura-amber-final.mp4",
  "/skinaura-blue-final.mp4",
  "/skinaura-green-final.mp4",
];


useEffect(() => {
  const timer = setInterval(() => {
    setRitualLine((prev) => (prev + 1) % 4);
  }, 3000);

  

  return () => clearInterval(timer);
}, []);

const handleSerumRecommendation = (serumKey) => {
  window.location.href = `/?serum=${serumKey}#serums`;
};

const isSkinDiscoveryPage =
  new URLSearchParams(window.location.search)
    .get("page") === "skin-discovery";

if (isSkinDiscoveryPage) {
  return (
    <SkinDiscovery
      onSelectSerum={handleSerumRecommendation}
    />
  );
}

  return (
    <main className="site" style={{ "--accent": serum.color }}>

<div
  aria-hidden="true"
  style={{
    position: "fixed",
    left: "-9999px",
    top: 0,
    width: "1px",
    height: "1px",
    overflow: "hidden",
    opacity: 0,
    pointerEvents: "none",
  }}
>
  {videoFiles.map((src) => (
    <video
      key={src}
      src={src}
      preload="auto"
      muted
      playsInline
    />
  ))}
</div>

      <header className="navbar">
        <a className="brand" href="#home">SkinAura<span>®</span></a>

        <nav>
          <a className="nav-active" href="#home">Home</a>
          <a href="#serums">Our Serums</a>
          <a href="#ai">AI Skin Analysis</a>
          <a href="#ritual">The Ritual</a>
        </nav>

        <div className="nav-actions">
          <button aria-label="Search"><Search size={18}/></button>
          <button aria-label="Shopping bag"><ShoppingBag size={18}/></button>
          <a className="outline-button" href="#ai">
            Find Your Serum <ArrowRight size={16}/>
          </a>
        </div>
      </header>

      <section className="hero" id="home" style={{ "--accent": serum.color }}>
        <div className="hero-glow"/>
        <div className="hero-copy-left">
          <span>SKIN</span>
          <span>THAT</span>
          <span>FEELS</span>
          <span>ALIVE.</span>
          <button className="watch-button" onClick={() => {
            setRitualOpen(!ritualOpen);
            document.getElementById("ritual")?.scrollIntoView({behavior:"smooth"});
          }}>
            <span className="play-circle"><Play size={20} fill="currentColor"/></span>
            <span>Watch<br/>The Ritual</span>
          </button>
        </div>

        <div className="model-frame">
 
<video
  key={active}
  className="model-image"
  src={
    active === "pink"
      ? "/skinaura-pink-model.mp4"
      : active === "amber"
      ? "/skinaura-amber-model.mp4"
      : active === "blue"
      ? "/skinaura-blue-model.mp4"
      : "/skinaura-green-model.mp4"
  }
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
/>



          <div className="model-shade"/>
          <div className="model-caption">THE ART OF SKINCARE</div>
        </div>

        <div className="orb orb-one"/>
        <div className="orb orb-two"/>
        <div className="orb orb-three"/>

        <div className="product-stage" aria-label={serum.liquid}>


{/* Liquid sphere — behind the serum bottle */}
<div className="sa-liquid-world" aria-hidden="true">
  <div className="sa-sphere">
    <div className="sa-sphere-highlight" />
  </div>

  <svg
    className="sa-ribbons"
    viewBox="0 0 600 520"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="saGlass" x1="0" y1="0" x2="600" y2="450">
        <stop offset="0%" stopColor="#fff4fc" stopOpacity=".08" />
        <stop offset="35%" stopColor="var(--accent)" stopOpacity=".85" />
<stop offset="65%" stopColor="var(--accent)" stopOpacity=".28" />
        <stop offset="100%" stopColor="#fff2fc" stopOpacity=".8" />
      </linearGradient>

      <filter id="saGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>

    {/* Soft glow behind the glass ribbons */}
    <g
  stroke="var(--accent)"
  strokeWidth="13"
  opacity=".24"
  filter="url(#saGlow)"
>
      <path d="M35 315 C95 70 300 65 475 190 S515 400 245 440 S65 240 535 100" />
      <path d="M65 115 C160 360 390 440 535 230 S320 55 90 350" />
    </g>

    {/* Glossy curved glass */}
    <g stroke="url(#saGlass)" strokeWidth="2.5">
      <path
        className="sa-ribbon-path"
        d="M35 315 C95 70 300 65 475 190 S515 400 245 440 S65 240 535 100"
      />
      <path
        className="sa-ribbon-path sa-ribbon-second"
        d="M65 115 C160 360 390 440 535 230 S320 55 90 350"
      />
    </g>

    {/* Fine reflective highlights */}
    <g
  stroke="var(--accent)"
  strokeWidth="1"
  opacity=".65"
>
      <path d="M75 295 C130 125 270 90 375 140" />
      <path d="M245 440 C360 435 440 370 465 325" />
    </g>
  </svg>

  {/* Floating glass bubbles */}
  <span className="sa-bubble sa-bubble-one" />
  <span className="sa-bubble sa-bubble-two" />
  <span className="sa-bubble sa-bubble-three" />
  <span className="sa-bubble sa-bubble-four" />

  {/* Floating petals */}
  <span className="sa-petal sa-petal-one" />
  <span className="sa-petal sa-petal-two" />
</div>

          <div className="product-halo" style={{ "--liquid-color": serum.liquidColor }}/>

          
<svg
  className="liquid-art"
  viewBox="0 0 600 520"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="liquidPink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fff0fa" stopOpacity=".9" />
      <stop offset="35%" stopColor="#ff85c5" stopOpacity=".55" />
      <stop offset="70%" stopColor="#e74c9c" stopOpacity=".16" />
      <stop offset="100%" stopColor="#fff0fa" stopOpacity=".8" />
    </linearGradient>
    <filter id="liquidGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" />
    </filter>
  </defs>

  <g className="liquid-ribbon-glow" fill="none" stroke="#ff82c5"
     strokeWidth="12" opacity=".28" filter="url(#liquidGlow)">
    <path d="M45 340 C100 100 300 90 420 210 S560 400 280 445 S40 260 450 90" />
    <path d="M60 150 C190 390 350 420 520 220 S280 60 110 300" />
  </g>

  <g fill="none" stroke="url(#liquidPink)" strokeWidth="2.5">
    <path className="ribbon-flow" d="M45 340 C100 100 300 90 420 210 S560 400 280 445 S40 260 450 90" />
    <path className="ribbon-flow ribbon-flow-two" d="M60 150 C190 390 350 420 520 220 S280 60 110 300" />
  </g>
</svg>

          

<img
  
  className="serum-product"
  src={
    active === "pink" ? "/skinaura-serum.png" :
    active === "amber" ? "/skinaura-serum1.png" :
    active === "blue" ? "/skinaura-serum2.png" :
    "/skinaura-serum3.png"
  }
  alt={`SkinAura ${serum.name} serum bottle`}
/>


          <div className="floating-drop"/>
        </div>

        <div className="hero-copy-right">
          <p className="eyebrow">BEAUTY MEETS INTELLIGENCE</p>
          <h1>{serum.title.split("\n").map((line, i) =>
            <span key={line}>{line}{i < 2 && <br/>}</span>
          )}</h1>
          <p className="hero-description">
            AI-powered skincare, luxurious rituals and a personalised
            experience — all in one place.
          </p>
          
<div className="hero-cta-row">
  <a className="primary-button" href="#ai">
    Discover Your Serum <ArrowRight size={18}/>
  </a>

  <div className="community-proof">
    <div className="avatar-stack">
      <img
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
        alt="SkinAura community member"
      />
      <img
        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&h=100&q=80"
        alt="SkinAura community member"
      />
      <img
        src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100&q=80"
        alt="SkinAura community member"
      />
    </div>

    <div className="community-text">
      <span>Loved by skincare enthusiasts</span>
      <strong>Discover your skin ritual</strong>
    </div>
  </div>
</div>

          <p className="social-proof"><span>✳</span> A new ritual for your skin</p>
        </div>

        <div className="serum-picker" id="serums">
          {Object.entries(serums).map(([key, item]) => (
           <button
  type="button"
  className={`serum-option ${active === key ? "selected" : ""}`}
  key={key}
  onMouseEnter={() => {
    console.log("Hovered serum:", key);
    setActive(key);
  }}
  onClick={() => setActive(key)}
  style={{ "--swatch": item.color }}
>
              
<span className="mini-bottle">
  <img
    src={
      key === "pink" ? "/serum-pink.png" :
      key === "amber" ? "/serum-amber.png" :
      key === "blue" ? "/serum-blue.png" :
      "/serum-green.png"
    }
    alt={`${item.name} serum bottle`}
  />
</span>

              <span className="option-text">
                <small>{item.name}</small>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                <em>{key === "pink" ? "Deep moisture" :
                    key === "amber" ? "Natural glow" :
                    key === "blue" ? "Calm & care" : "Skin balance"}</em>
              </span>
            </button>
          ))}
        </div>

        <a href="#science" className="scroll-hint">
          <span>↓</span> Scroll to explore
        </a>
      </section>

      
<section
  className="science-section science-full-bg"
  id="science"
  style={{ "--accent": serum.color }}
>
  
<div className="science-background" aria-hidden="true">
  <video
    key={active}
    className="science-background-video"
    src={
      active === "pink"
        ? "/ritual-drops.mp4"
        : active === "amber"
        ? "/amber-drops.mp4"
        : active === "blue"
        ? "/blue-drops.mp4"
        : "/green-drops.mp4"
    }
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />
</div>


  <div className="science-overlay" />

  <div className="science-heading">
    <p className="eyebrow">A MORE MINDFUL RITUAL</p>

    <h2>
      {active === "pink" && <>THE HYDRATION<br />RITUAL.</>}
      {active === "amber" && <>THE GLOW<br />RITUAL.</>}
      {active === "blue" && <>THE CALM<br />RITUAL.</>}
      {active === "green" && <>THE BALANCE<br />RITUAL.</>}
    </h2>

    <p>
      {active === "pink" && <>A wave of moisture.<br />A softer-looking glow.</>}
      {active === "amber" && <>A ritual for radiance.<br />Meet your natural glow.</>}
      {active === "blue" && <>Slow down and soothe.<br />A moment of calm.</>}
      {active === "green" && <>Care in balance.<br />Your daily skin ritual.</>}
    </p>
  </div>

  <div className="ingredients">
    <p className="eyebrow">INGREDIENT SPOTLIGHT</p>

    {(active === "pink" ? [
      ["01", "Hyaluronic Acid", "Helps skin retain moisture"],
      ["02", "Glycerin", "Draws moisture into the skin"],
      ["03", "Panthenol", "Supports the skin barrier"],
      ["04", "Aloe Vera", "A soothing hydration ritual"]
    ] : active === "amber" ? [
      ["01", "Vitamin C", "Helps brighten dull-looking skin"],
      ["02", "Vitamin E", "Antioxidant skincare support"],
      ["03", "Ferulic Acid", "Antioxidant-focused care"],
      ["04", "Licorice Extract", "Helps improve uneven-looking tone"]
    ] : active === "blue" ? [
      ["01", "Centella Asiatica", "A soothing skincare ingredient"],
      ["02", "Panthenol", "Supports the skin barrier"],
      ["03", "Allantoin", "Helps soften the skin"],
      ["04", "Oat Extract", "Comfort for sensitive-feeling skin"]
    ] : [
      ["01", "Niacinamide", "Helps balance the look of oily skin"],
      ["02", "Zinc PCA", "Oil-balance skincare support"],
      ["03", "Green Tea Extract", "Antioxidant botanical care"],
      ["04", "Willow Bark Extract", "A balancing skincare concept"]
    ]).map(([n, title, desc]) => (
      <div className="ingredient" key={n}>
        <span>{n}</span>
        <div>
          <strong>{title}</strong>
          <small>{desc}</small>
        </div>
        <ArrowRight size={18} />
      </div>
    ))}
  </div>
</section>




<section
  className="ritual-cinema ritual-theme-section"
  id="ritual"
  style={{
    "--ritual-accent": serum.color,
    "--ritual-bg-image": `url("/ritual-bg-${active}.png")`
  }}
>



  {/* TOP TITLE */}
  <div className="ritual-heading">
    <p className="eyebrow">THE SKINAURA RITUAL</p>

    <h2>
      The <span>Ritual.</span>
    </h2>

    <p>
      A simple, science-inspired routine for your most
      beautiful skin days.
    </p>
  </div>

  {/* MAIN CONTENT */}
  <div className="ritual-experience-grid">

    {/* LEFT TEXT */}
    <div className="ritual-intro">

      <p className="eyebrow">YOUR DAILY MOMENT</p>

      <h3>
        Apply
        <br />
        Your
        <br />
        <span>Serum.</span>
      </h3>

      <p className="ritual-intro-description">
        A few thoughtful drops. A gentle touch.
        A skincare moment made for your skin.
      </p>

      <div className="ritual-current-serum">
        <span className="ritual-serum-dot" />
        {serum.name} COLLECTION
      </div>

      <button
        className="ritual-explore-button"
        onClick={() => setRitualOpen(true)}
      >
        EXPLORE THE RITUAL
        <span>→</span>
      </button>

    </div>

    {/* CENTRE VIDEO */}
    <div className="ritual-showcase">

      <div className="ritual-video-frame">

        <video
          className="ritual-main-video"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          onTimeUpdate={handleRitualVideoTime}
        >
          <source
            src="/skinaura-ritual.mp4"
            type="video/mp4"
          />
        </video>

        <div className="ritual-video-label">
          <span>SKINAURA FILM</span>
          <span>{serum.name}</span>
        </div>

      </div>

      {/* BOTTOM RITUAL STAGES */}
      <div className="ritual-stage-cards">

        <div className={`ritual-stage-card ${ritualStep === "cleanse" ? "active" : ""}`}>
          <span>01</span>
          <div>
            <h4>Cleanse</h4>
            <p>Refresh your skin</p>
            
          </div>
        </div>

        <div className={`ritual-stage-card ${ritualStep === "apply" ? "active" : ""}`}>
          <span>02</span>
          <div>
            <h4>Apply</h4>
            <p>Your serum moment</p>
          </div>
        </div>

        <div className="ritual-stage-card">
          <span>03</span>
          <div>
            <h4>Glow</h4>
            <p>Reveal your aura</p>
          </div>
        </div>

      </div>

    </div>

    {/* RIGHT VERTICAL TIMELINE */}
    <div className="ritual-timeline">

      <div className="ritual-step">
        <div className="ritual-step-icon">◇</div>
        <div>
          <span>01</span>
          <h4>Cleanse</h4>
          <p>Remove impurities and prepare your skin.</p>
        </div>
      </div>

      <div className="ritual-step selected">
        <div className="ritual-step-icon">✧</div>
        <div>
          <span>02</span>
          <h4>Apply</h4>
          <p>Use a few drops of your SkinAura serum.</p>
        </div>
      </div>

      <div className="ritual-step">
        <div className="ritual-step-icon">♧</div>
        <div>
          <span>03</span>
          <h4>Massage</h4>
          <p>Gently massage for an even application.</p>
        </div>
      </div>

      <div className="ritual-step">
        <div className="ritual-step-icon">✦</div>
        <div>
          <span>04</span>
          <h4>Glow</h4>
          <p>Finish your daily skincare ritual.</p>
        </div>
      </div>

    </div>

  </div>

</section>




      
<section
  className={`skin-cta-section skin-cta-${active}`}
  style={{ "--accent": serum.color }}
>

<div className="skin-cta-background" aria-hidden="true">
  <video
    key={active}
    className="skin-cta-background-video"
    src={
      active === "pink"
        ? "/skinaura-final-bg.mp4"
        : active === "amber"
        ? "/skinaura-amber-final.mp4"
        : active === "blue"
        ? "/skinaura-blue-final.mp4"
        : "/skinaura-green-final.mp4"
    }
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />
</div>



 
<div className="skin-cta-content">

  <p className="eyebrow">
    YOUR SKIN, YOUR STORY
  </p>

  <h2>
    Find your
    <br />
    <span>SkinAura.</span>
  </h2>

  <p className="skin-cta-description">
    A personalized skincare ritual for calmer,
    healthier and more radiant skin.
  </p>

  
<div className="skin-cta-steps">

  <div className="skin-cta-step">
    <span className="step-icon">♧</span>
    <h3>Cleanse</h3>
    <p>Refresh &amp; purify</p>
  </div>

  <div className="skin-cta-step">
    <span className="step-icon">✿</span>
    <h3>Treat</h3>
    <p>Nourish &amp; care</p>
  </div>

  <div className="skin-cta-step">
    <span className="step-icon">✧</span>
    <h3>Glow</h3>
    <p>Reveal your natural radiance</p>
  </div>

</div>


 <a
  href="/?page=skin-discovery"
  target="_blank"
  rel="noopener noreferrer"
  className="skin-cta-button"
>
  Discover Your Skin
  <span>→</span>
</a>

</div>

</section>



<footer className="site-footer" style={{ "--accent": serum.color }}>
  <a className="footer-brand" href="#home">SkinAura<span>®</span></a>
  <p>Your skin. Your science. Your aura.</p>
  <span>© 2026 SkinAura — Concept experience</span>
</footer>

    </main>
  );
}
