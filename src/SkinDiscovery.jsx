
import { useEffect, useState } from "react";
import "./SkinDiscovery.css";

const questions = [
  {
    id: "skinType",
    label: "LET'S UNDERSTAND YOUR SKIN",
    title: "How would you describe your skin type?",
    subtitle: "Choose what feels closest to your skin.",
    options: ["Oily", "Dry", "Combination", "Normal", "Not sure"],
  },
  {
    id: "goal",
    label: "YOUR SKIN GOALS",
    title: "What is your biggest skincare goal?",
    subtitle: "What would you most like to focus on?",
    options: [
      "Hydration",
      "Radiance and glow",
      "Calming and comfort",
      "Oil balance",
    ],
  },
  {
    id: "afterWash",
    label: "GETTING TO KNOW YOUR SKIN",
    title: "How does your skin feel after washing?",
    subtitle: "Think about how your skin usually feels.",
    options: [
      "Tight or dry",
      "Shiny quite quickly",
      "Dry in some areas, oily in others",
      "Comfortable",
    ],
  },
  {
    id: "sensitivity",
    label: "YOUR SKIN COMFORT",
    title: "How easily does your skin react to products?",
    subtitle: "Choose the option that best describes your experience.",
    options: ["Often", "Sometimes", "Rarely", "Not sure"],
  },
  {
    id: "texture",
    label: "YOUR PERSONAL PREFERENCE",
    title: "Which serum texture would you prefer?",
    subtitle: "Choose the texture you would enjoy using.",
    options: [
      "Lightweight",
      "Rich and nourishing",
      "Gel-like and fresh",
      "No preference",
    ],
  },
];

const serumDetails = {
  pink: {
    name: "PINK",
    category: "HYDRATION",
    color: "#e99fbe",
    description: "A hydration-focused match for your skincare preferences.",
    reason: "Your answers suggest that hydration and a comfortable skin feel are your main priorities.",
    benefits: ["Hydration focused", "Soft skin feel", "Daily care"],
  },
  amber: {
    name: "AMBER",
    category: "RADIANCE",
    color: "#dca65f",
    description: "A radiance-focused match for your skincare preferences.",
    reason: "Your answers suggest that radiance and a fresh-looking complexion are your main priorities.",
    benefits: ["Radiance focused", "Fresh-looking glow", "Daily care"],
  },
  blue: {
    name: "BLUE",
    category: "SOOTHING",
    color: "#8bbbd5",
    description: "A calming-care match for your skincare preferences.",
    reason: "Your answers suggest that gentle, calming skincare is especially important to you.",
    benefits: ["Calming-care focus", "Comfort focused", "Gentle routine"],
  },
  green: {
    name: "GREEN",
    category: "BALANCING",
    color: "#9ab78e",
    description: "A balancing-focused match for your skincare preferences.",
    reason: "Your answers suggest that oil balance and a lightweight skincare feel are your priorities.",
    benefits: ["Balance focused", "Lightweight feel", "Daily care"],
  },
};

function getRecommendation(answers) {
  const scores = {
    pink: 0,
    amber: 0,
    blue: 0,
    green: 0,
  };

  if (answers.skinType === "Dry") scores.pink += 3;
  if (answers.skinType === "Oily") scores.green += 3;

  if (answers.skinType === "Combination") {
    scores.green += 2;
    scores.pink += 1;
  }

  if (answers.skinType === "Normal") scores.amber += 1;

  const goalMatch = {
    "Hydration": "pink",
    "Radiance and glow": "amber",
    "Calming and comfort": "blue",
    "Oil balance": "green",
  };

  const preferred = goalMatch[answers.goal];

  if (preferred) scores[preferred] += 5;

  if (answers.afterWash === "Tight or dry") scores.pink += 2;
  if (answers.afterWash === "Shiny quite quickly") scores.green += 2;

  if (
    answers.afterWash === "Dry in some areas, oily in others"
  ) {
    scores.pink += 1;
    scores.green += 1;
  }

  if (answers.afterWash === "Comfortable") scores.amber += 1;

  if (answers.sensitivity === "Often") scores.blue += 3;
  if (answers.sensitivity === "Sometimes") scores.blue += 2;

  if (answers.texture === "Rich and nourishing") scores.pink += 1;

  if (answers.texture === "Lightweight") {
    scores.green += 1;
    scores.blue += 1;
  }

  if (answers.texture === "Gel-like and fresh") {
    scores.blue += 1;
    scores.green += 1;
  }

  const highest = Math.max(...Object.values(scores));

  const tied = Object.keys(scores).filter(
    (key) => scores[key] === highest
  );

  const winner = tied.includes(preferred) ? preferred : tied[0];

  return {
    key: winner,
    ...serumDetails[winner],
  };
}

export default function SkinDiscovery({ onSelectSerum }) {
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const question = questions[step];
  const selected = answers[question.id];

  useEffect(() => {
    if (stage !== "analysis") return;

    const timer = setTimeout(() => {
      setStage("result");
    }, 2600);

    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
  if (stage === "result") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [stage]);

  function handleNext() {
    if (!selected) return;

    if (step < questions.length - 1) {
      setStep((previous) => previous + 1);
    } else {
      setResult(getRecommendation(answers));
      setStage("analysis");
    }
  }

  function handleBack() {
    if (step === 0) {
      setStage("intro");
    } else {
      setStep((previous) => previous - 1);
    }
  }

  function handleRetake() {
    setAnswers({});
    setStep(0);
    setResult(null);
    setStage("quiz");
  }

  return (
    <main className="sd-page">

      <header className="sd-topbar">
        <a href="/" className="sd-logo">SkinAura<span>®</span></a>

        <div className="sd-top-label">
          YOUR PERSONAL SKIN JOURNEY
        </div>

        <a className="sd-close" href="/">
          EXIT ✕
        </a>
      </header>

      {stage === "intro" && (
        <section className="sd-intro" key="intro">

         
<div className="sd-intro-copy">

  <p className="sd-eyebrow">
    A PERSONALIZED SKIN DISCOVERY
  </p>

  <h1>
    Discover Your
    <br />
    Skin.
    <br />
    <span>Find Your Aura.</span>
  </h1>

  <p className="sd-intro-description">
    A few thoughtful questions to understand
    your skin and find your best match.
  </p>

  <button
    className="sd-primary-button"
    onClick={() => setStage("quiz")}
  >
    BEGIN MY SKIN DISCOVERY
    <span>→</span>
  </button>

  <div className="sd-features">

    <div>
      <span>✧</span>
      <p>
        Personalized<br />
        guidance
      </p>
    </div>

    <div>
      <span>◈</span>
      <p>
        Four<br />
        serum worlds
      </p>
    </div>

    <div>
      <span>✳</span>
      <p>
        Your<br />
        preferences first
      </p>
    </div>

  </div>

</div>


          <div className="sd-intro-visual">
            <img
              src="/glow.png"
              alt="SkinAura skincare editorial"
            />
            <div className="sd-visual-overlay" />
            <div className="sd-visual-caption">
              <span>01 / THE SKIN STORY</span>
              <p>A more mindful ritual.</p>
            </div>
            <div className="sd-orbit sd-orbit-one" />
            <div className="sd-orbit sd-orbit-two" />
          </div>

          <div className="sd-floating-note">
            YOUR SKIN. YOUR SCIENCE. YOUR AURA.
          </div>

        </section>
      )}

      {stage === "quiz" && (
        <section className="sd-quiz-layout" key={step}>

          <aside className="sd-quiz-visual">
            <img src="/ritual-pink.png" alt="" />
            <div className="sd-visual-overlay" />

            <div className="sd-quiz-visual-content">
              <p>SKINAURA / SKIN DISCOVERY</p>
              <h2>
                Every skin
                <br />
                has a story.
              </h2>
              <span>Let's discover yours.</span>
            </div>
          </aside>

          <div className="sd-quiz-main">

            <div className="sd-progress-heading">
              <span>YOUR SKIN DISCOVERY</span>
              <span>{step + 1} / {questions.length}</span>
            </div>

            <div className="sd-progress-track">
              <div
                className="sd-progress-fill"
                style={{
                  width: `${((step + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <div className="sd-question-content">
              <p className="sd-eyebrow">{question.label}</p>

              <h2>{question.title}</h2>

              <p className="sd-question-subtitle">
                {question.subtitle}
              </p>
            </div>

           
<div className="sd-options sd-image-options">
  {question.options.map((option, index) => {
    const optionKey = option.toLowerCase().replace(/\s+/g, "-");

    return (
      <button
        key={option}
        type="button"
        data-option={optionKey}
        className={
          selected === option
            ? "sd-option sd-image-option sd-selected"
            : "sd-option sd-image-option"
        }
        onClick={() =>
          setAnswers((previous) => ({
            ...previous,
            [question.id]: option,
          }))
        }
      >
        <span className="sd-option-visual">
          <span className="sd-glass-orb" />
          <span className="sd-liquid-shine" />
        </span>

        <span className="sd-option-label">
          {option}
        </span>

        <span className="sd-option-indicator">
          {selected === option ? "✓" : "+"}
        </span>
      </button>
    );
  })}
</div>

            <div className="sd-quiz-bottom">
              <button
                className="sd-back-button"
                onClick={handleBack}
              >
                ← BACK
              </button>

              <button
                className="sd-primary-button sd-continue"
                disabled={!selected}
                onClick={handleNext}
              >
                {step === questions.length - 1
                  ? "REVEAL MY MATCH →"
                  : "CONTINUE →"}
              </button>
            </div>

            <p className="sd-privacy-note">
              YOUR ANSWERS HELP PERSONALISE YOUR EXPERIENCE.
            </p>
          </div>
        </section>
      )}

      {stage === "analysis" && (
        <section className="sd-analysis">
          <div className="sd-analysis-orb">
            <div className="sd-analysis-ring ring-one" />
            <div className="sd-analysis-ring ring-two" />
            <div className="sd-analysis-core">
              <span>✧</span>
              <p>ANALYSING</p>
              <h2>YOUR SKIN<br />PROFILE...</h2>
              <small>Matching your preferences with our collection.</small>
            </div>
          </div>

          <p className="sd-eyebrow">
            THE SKINAURA DISCOVERY
          </p>

          <h2>Finding your perfect match.</h2>

          <div className="sd-analysis-dots">
            <i />
            <i />
            <i />
          </div>
        </section>
      )}


{stage === "result" && result && (
  <section
    className="sd-match-page"
    key="result"
    style={{ "--match-accent": result.color }}
  >

    {/* LEFT: PRODUCT EDITORIAL DISPLAY */}
    <div className="sd-match-art">

      <div className="sd-match-art-glow" />

      <div className="sd-match-art-frame">
        <img
          src={`/serum-${result.key}.png`}
          alt={`${result.name} ${result.category} serum`}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="sd-match-art-overlay">
          <span>YOUR SKINAURA MATCH</span>
          <h3>{result.name} / {result.category}</h3>
        </div>
      </div>

      <div className="sd-art-caption">
        SKINAURA SIGNATURE COLLECTION
      </div>

    </div>

    {/* RIGHT: RECOMMENDATION */}
    <div className="sd-match-content">

      <p className="sd-match-eyebrow">
        YOUR PERSONALIZED SKINAURA MATCH
      </p>

      <h2 className="sd-match-title">
        It's a <span>Match.</span>
        <i>✧</i>
      </h2>

      <p className="sd-match-tagline">
        {result.key === "pink" &&
          "A softer, more hydrated feeling starts here."}

        {result.key === "amber" &&
          "A brighter-looking ritual starts here."}

        {result.key === "blue" &&
          "A calmer routine starts here."}

        {result.key === "green" &&
          "A fresher, balanced-feeling routine starts here."}
      </p>

      <div className="sd-match-product-card">
        <p className="sd-match-product-label">
          YOUR RECOMMENDED SERUM
        </p>

        <h3>
          {result.name} — {result.category}
        </h3>

        <p>{result.description}</p>
      </div>

      <div className="sd-match-benefits">
        {result.benefits.map((benefit, index) => (
          <div className="sd-match-benefit" key={benefit}>
            <span>{["✧", "◈", "✳"][index]}</span>
            <p>{benefit}</p>
          </div>
        ))}
      </div>

      <div className="sd-match-reason">
        <p className="sd-match-eyebrow">WHY THIS MATCH?</p>
        <p>{result.reason}</p>
      </div>

      <button
        type="button"
        className="sd-match-primary"
        onClick={() => onSelectSerum?.(result.key)}
      >
        EXPLORE YOUR {result.name} SERUM
        <span>→</span>
      </button>

      <div className="sd-match-actions">

        <button
          type="button"
          onClick={() => setStage("routine")}
        >
          VIEW MY SKIN RITUAL
        </button>

        <span className="sd-match-separator">|</span>

        <button
          type="button"
          onClick={handleRetake}
        >
          ↻ RETAKE DISCOVERY
        </button>

      </div>

    </div>

  </section>
)}


      {stage === "routine" && result && (
        <section
          className="sd-routine"
          style={{ "--sd-accent": result.color }}
        >
          <p className="sd-eyebrow">YOUR PERSONAL SKIN RITUAL</p>

          <h2>
            Three steps.
            <br />
            <span>Your daily moment.</span>
          </h2>

          <p className="sd-routine-description">
            A simple skincare routine to complement
            your {result.name} — {result.category} match.
          </p>

          <div className="sd-routine-cards">
            <article>
              <span>01</span>
              <div className="sd-routine-icon">◌</div>
              <h3>CLEANSE</h3>
              <p>Begin with a gentle cleanser suited to your skin.</p>
            </article>

            <article>
              <span>02</span>
              <div className="sd-routine-icon">✧</div>
              <h3>TREAT</h3>
              <p>Explore your selected SkinAura serum.</p>
            </article>

            <article>
              <span>03</span>
              <div className="sd-routine-icon">◈</div>
              <h3>MOISTURISE</h3>
              <p>Finish with a moisturiser that suits your skin.</p>
            </article>
          </div>

          <button
            className="sd-primary-button"
            onClick={() => onSelectSerum?.(result.key)}
          >
            EXPLORE MY {result.name} SERUM →
          </button>

          <button
            className="sd-retake-button"
            onClick={handleRetake}
          >
            RETAKE SKIN DISCOVERY
          </button>
        </section>
      )}

      <footer className="sd-footer">
        <span>SkinAura®</span>
        <p>Your skin. Your science. Your aura.</p>
        <small>© 2026 SkinAura</small>
      </footer>

    </main>
  );
}
