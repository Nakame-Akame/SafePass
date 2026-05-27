import React, {
  useState,
  useMemo,
  useEffect
} from 'react';

import './App.css';

/* ======================================================
   DEFAULT STATE
====================================================== */

const DEFAULT_ANALYSIS = {
  label: 'Ingresa una contraseña',
  color: '#64748b',
  progress: 0,
  entropy: 0,
  crackTime: '--',
  tips: [],
  level: 'NONE'
};

/* ======================================================
   WEAK PATTERNS
====================================================== */

const weakPatterns = [
  /1234/,
  /qwerty/i,
  /password/i,
  /admin/i,
  /abcd/i,
  /(.)\1{2,}/
];

/* ======================================================
   SECURE PASSWORD GENERATOR
====================================================== */

function generateSecurePassword(length = 18) {

  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}<>?';

  const randomValues =
    new Uint32Array(length);

  crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map(value =>
      chars[value % chars.length]
    )
    .join('');
}

/* ======================================================
   ENTROPY CALCULATION
====================================================== */

function calculateEntropy(password) {

  let charset = 0;

  if (/[a-z]/.test(password)) charset += 26;
  if (/[A-Z]/.test(password)) charset += 26;
  if (/[0-9]/.test(password)) charset += 10;
  if (/[^\w\s]/.test(password)) charset += 32;

  if (charset === 0) return 0;

  return Math.round(
    password.length * Math.log2(charset)
  );
}

/* ======================================================
   CRACK TIME ESTIMATION
====================================================== */

function estimateCrackTime(entropy) {

  if (entropy < 28)
    return 'Segundos ⚠️';

  if (entropy < 36)
    return 'Horas';

  if (entropy < 60)
    return 'Años';

  if (entropy < 80)
    return 'Siglos 🔥';

  return 'Miles de años 🛡️';
}

/* ======================================================
   PASSWORD ANALYZER
====================================================== */

function evaluatePassword(password) {

  if (!password)
    return DEFAULT_ANALYSIS;

  let score = 0;

  const checks = {

    length8:
      password.length >= 8,

    length12:
      password.length >= 12,

    numbers:
      /\d/.test(password),

    specials:
      /[^\w\s]/.test(password),

    lowercase:
      /[a-z]/.test(password),

    uppercase:
      /[A-Z]/.test(password),

    patterns:
      weakPatterns.some((regex) =>
        regex.test(password)
      )
  };

  const tips = [];

  /* ======================================================
     AI SCORING
  ====================================================== */

  if (checks.length8) {
    score += 15;
  } else {
    tips.push('Usa mínimo 8 caracteres');
  }

  if (checks.length12) {
    score += 15;
  } else {
    tips.push('12+ caracteres es ideal');
  }

  if (checks.numbers) {
    score += 15;
  } else {
    tips.push('Agrega números');
  }

  if (checks.specials) {
    score += 20;
  } else {
    tips.push('Incluye símbolos especiales');
  }

  if (
    checks.lowercase &&
    checks.uppercase
  ) {
    score += 20;
  } else {
    tips.push('Combina mayúsculas y minúsculas');
  }

  if (!checks.patterns) {
    score += 15;
  } else {
    score -= 20;
    tips.push('Evita patrones comunes');
  }

  /* ======================================================
     ENTROPY
  ====================================================== */

  const entropy =
    calculateEntropy(password);

  const crackTime =
    estimateCrackTime(entropy);

  /* ======================================================
     CLASSIFICATION
  ====================================================== */

  if (score <= 40) {

    return {
      label: 'Seguridad Débil 🔴',
      color: '#ef4444',
      progress: score,
      entropy,
      crackTime,
      tips,
      level: 'WEAK'
    };
  }

  if (score <= 75) {

    return {
      label: 'Seguridad Media 🟡',
      color: '#facc15',
      progress: score,
      entropy,
      crackTime,
      tips,
      level: 'MEDIUM'
    };
  }

  return {
    label: 'Seguridad Segura 🟢',
    color: '#22c55e',
    progress: score,
    entropy,
    crackTime,
    tips,
    level: 'STRONG'
  };
}

/* ======================================================
   APP
====================================================== */

function App() {

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  /* ======================================================
     LIVE ANALYSIS
  ====================================================== */

  const analysis = useMemo(
    () => evaluatePassword(password),
    [password]
  );

  /* ======================================================
     RESET COPY STATUS
  ====================================================== */

  useEffect(() => {

    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => clearTimeout(timer);

  }, [copied]);

  /* ======================================================
     GENERATE PASSWORD
  ====================================================== */

  const handleGenerate = async () => {

    try {

      setLoading(true);

      await new Promise(resolve =>
        setTimeout(resolve, 400)
      );

      const generated =
        generateSecurePassword(18);

      setPassword(generated);

    } catch (err) {

      console.error(err);

      alert(
        'Error generando contraseña'
      );

    } finally {

      setLoading(false);
    }
  };

  /* ======================================================
     COPY TO CLIPBOARD
  ====================================================== */

  const copyToClipboard = async () => {

    if (!password) return;

    try {

      await navigator.clipboard.writeText(
        password
      );

      setCopied(true);

    } catch {

      alert('No se pudo copiar');
    }
  };

  /* ======================================================
     UI
  ====================================================== */

  return (

    <div className="safe-pass-container">

      <div className="card">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="header">

          <h1>
            SafePass AI 🛡️
          </h1>

          <p className="subtitle">
            Edge AI Password Analyzer
          </p>

        </div>

        {/* ======================================================
            INPUT
        ====================================================== */}

        <div className="input-wrapper">

          <input
            type={
              showPassword
                ? 'text'
                : 'password'
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Escribe tu contraseña..."
            className="password-input"
            autoComplete="off"
          />

          <button
            className="toggle-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? '🙈' : '👁️'}
          </button>

        </div>

        {/* ======================================================
            STRENGTH METER
        ====================================================== */}

        <div className="meter">

          <div
            className="meter-fill"
            style={{
              width: `${analysis.progress}%`,
              background: analysis.color
            }}
          />

        </div>

        {/* ======================================================
            STATUS
        ====================================================== */}

        <div className="analysis-header">

          <h2
            style={{
              color: analysis.color
            }}
          >
            {analysis.label}
          </h2>

          <span className="entropy">
            Entropía:
            {' '}
            {analysis.entropy} bits
          </span>

        </div>

        {/* ======================================================
            CRACK TIME
        ====================================================== */}

        <div className="crack-box">

          <span>
            ⏳ Tiempo estimado de crackeo:
          </span>

          <strong>
            {analysis.crackTime}
          </strong>

        </div>

        {/* ======================================================
            AI TIPS
        ====================================================== */}

        {
          analysis.tips.length > 0 && (

            <div className="tips-box">

              <h3>
                Recomendaciones IA
              </h3>

              {
                analysis.tips.map(
                  (tip, index) => (

                    <p key={index}>
                      ⚠️ {tip}
                    </p>
                  )
                )
              }

            </div>
          )
        }

        {/* ======================================================
            BUTTONS
        ====================================================== */}

        <div className="button-group">

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading}
          >

            {
              loading
                ? 'Generando...'
                : 'Generar Segura'
            }

          </button>

          <button
            className="copy-btn"
            onClick={copyToClipboard}
            disabled={!password}
          >

            {
              copied
                ? 'Copiado ✅'
                : 'Copiar'
            }

          </button>

        </div>

        {/* ======================================================
            REQUIREMENTS
        ====================================================== */}

        <div className="requirements">

          <div className="requirement">
            ✔ 12+ caracteres
          </div>

          <div className="requirement">
            ✔ Símbolos especiales
          </div>

          <div className="requirement">
            ✔ Mezcla de letras
          </div>

          <div className="requirement">
            ✔ Sin patrones humanos
          </div>

        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div className="info-footer">

          <p>
            🔒 Privacy by Design
          </p>

          <p>
            Todo el análisis ocurre localmente.
          </p>

          <p>
            Funciona incluso sin internet.
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;