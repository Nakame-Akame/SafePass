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
   CONSTANTS
====================================================== */

const SYMBOL_COUNT = 19;

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

  const uppercase =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const lowercase =
    'abcdefghijklmnopqrstuvwxyz';

  const numbers =
    '0123456789';

  const symbols =
    '!@#$%^&*()_+[]{}<>?';

  const allChars =
    uppercase +
    lowercase +
    numbers +
    symbols;

  const guaranteed = [
    uppercase[
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0] % uppercase.length
    ],

    lowercase[
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0] % lowercase.length
    ],

    numbers[
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0] % numbers.length
    ],

    symbols[
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0] % symbols.length
    ]
  ];

  const remaining =
    length - guaranteed.length;

  const randomValues =
    new Uint32Array(remaining);

  crypto.getRandomValues(randomValues);

  const randomChars =
    Array.from(randomValues)
      .map(
        value =>
          allChars[
            value % allChars.length
          ]
      );

  const finalPassword = [
    ...guaranteed,
    ...randomChars
  ];

  /* ======================================================
     SHUFFLE
  ====================================================== */

  for (
    let i = finalPassword.length - 1;
    i > 0;
    i--
  ) {

    const j =
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0] % (i + 1);

    [
      finalPassword[i],
      finalPassword[j]
    ] = [
      finalPassword[j],
      finalPassword[i]
    ];
  }

  return finalPassword.join('');
}

/* ======================================================
   ENTROPY CALCULATION
====================================================== */

function calculateEntropy(password) {

  let charset = 0;

  if (/[a-z]/.test(password))
    charset += 26;

  if (/[A-Z]/.test(password))
    charset += 26;

  if (/[0-9]/.test(password))
    charset += 10;

  if (/[^\w\s]/.test(password))
    charset += SYMBOL_COUNT;

  if (charset === 0)
    return 0;

  return Math.round(
    password.length *
    Math.log2(charset)
  );
}

/* ======================================================
   CRACK TIME ESTIMATION
====================================================== */

function estimateCrackTime(entropy) {

  if (entropy < 28)
    return 'Instantáneo ⚠️';

  if (entropy < 36)
    return 'Minutos';

  if (entropy < 60)
    return 'Horas';

  if (entropy < 80)
    return 'Años';

  if (entropy < 100)
    return 'Siglos 🔥';

  return 'Miles de años 🛡️';
}

/* ======================================================
   SCORE CALCULATION
====================================================== */

function calculateScore(checks) {

  let score = 0;

  if (checks.length8)
    score += 15;

  if (checks.length12)
    score += 15;

  if (checks.numbers)
    score += 15;

  if (checks.specials)
    score += 20;

  if (
    checks.lowercase &&
    checks.uppercase
  ) {
    score += 20;
  }

  if (!checks.weakPatterns) {
    score += 15;
  } else {
    score -= 20;
  }

  return Math.max(
    0,
    Math.min(score, 100)
  );
}

/* ======================================================
   SECURITY TIPS
====================================================== */

function generateTips(checks) {

  const tips = [];

  if (!checks.length8) {
    tips.push(
      'Usa mínimo 8 caracteres'
    );
  }

  if (!checks.length12) {
    tips.push(
      '12 o más caracteres es lo ideal'
    );
  }

  if (!checks.numbers) {
    tips.push(
      'Incluye al menos un número'
    );
  }

  if (!checks.specials) {
    tips.push(
      'Agrega símbolos especiales'
    );
  }

  if (
    !checks.lowercase ||
    !checks.uppercase
  ) {
    tips.push(
      'Combina mayúsculas y minúsculas'
    );
  }

  if (checks.weakPatterns) {
    tips.push(
      'Evita patrones comunes o repetitivos'
    );
  }

  return tips;
}

/* ======================================================
   PASSWORD CLASSIFICATION
====================================================== */

function classifyStrength(
  score,
  entropy,
  crackTime,
  tips
) {

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
    label: 'Seguridad Fuerte 🟢',
    color: '#22c55e',
    progress: score,
    entropy,
    crackTime,
    tips,
    level: 'STRONG'
  };
}

/* ======================================================
   PASSWORD ANALYZER
====================================================== */

function evaluatePassword(password) {

  if (!password)
    return DEFAULT_ANALYSIS;

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

    weakPatterns:
      weakPatterns.some(regex =>
        regex.test(password)
      )
  };

  const score =
    calculateScore(checks);

  const tips =
    generateTips(checks);

  const entropy =
    calculateEntropy(password);

  const crackTime =
    estimateCrackTime(entropy);

  return classifyStrength(
    score,
    entropy,
    crackTime,
    tips
  );
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

    const timer =
      setTimeout(() => {
        setCopied(false);
      }, 1800);

    return () =>
      clearTimeout(timer);

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

      setShowPassword(true);

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

      await navigator.clipboard
        .writeText(password);

      setCopied(true);

    } catch {

      alert(
        'No se pudo copiar'
      );
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
            SafePass 🛡️
          </h1>

          <p className="subtitle">
            Advanced Password Analyzer
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
              setPassword(
                e.target.value
              )
            }
            placeholder="Escribe tu contraseña..."
            className="password-input"
            autoComplete="off"
          />

          <button
            className="toggle-btn"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {
              showPassword
                ? '🙈'
                : '👁️'
            }
          </button>

        </div>

        {/* ======================================================
            STRENGTH METER
        ====================================================== */}

        <div className="meter">

          <div
            className="meter-fill"
            style={{
              width:
                `${analysis.progress}%`,
              background:
                analysis.color
            }}
          />

        </div>

        {/* ======================================================
            STATUS
        ====================================================== */}

        <div className="analysis-header">

          <h2
            style={{
              color:
                analysis.color
            }}
          >
            {analysis.label}
          </h2>

          <span className="entropy">

            Entropía:
            {' '}
            {analysis.entropy}
            {' '}
            bits

          </span>

        </div>

        {/* ======================================================
            CRACK TIME
        ====================================================== */}

        <div className="crack-box">

          <span>
            ⏳ Tiempo estimado de vulneración:
          </span>

          <strong>
            {analysis.crackTime}
          </strong>

        </div>

        {/* ======================================================
            SECURITY TIPS
        ====================================================== */}

        {
          analysis.tips.length > 0 && (

            <div className="tips-box">

              <h3>
                Recomendaciones de seguridad
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
                : 'Generar contraseña'
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
            ✔ Letras mayúsculas y minúsculas
          </div>

          <div className="requirement">
            ✔ Sin patrones comunes
          </div>

        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        <div className="info-footer">

          <p>
            🔒 Privacidad garantizada
          </p>

          <p>
            El análisis se realiza localmente.
          </p>

          <p>
            No se envían datos a servidores externos.
          </p>

          <p>
            Funciona incluso sin conexión.
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;