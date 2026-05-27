import weakPatterns
from './weakPatterns';

import {
  calculateEntropy,
  estimateCrackTime
} from './entropy';

/* ======================================================
   DEFAULT STATE
====================================================== */

const DEFAULT_ANALYSIS = {

  label:
    'Ingresa una contraseña',

  color:
    '#64748b',

  progress: 0,

  entropy: 0,

  crackTime: '--',

  tips: [],

  level: 'NONE'
};

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
      'Evita patrones comunes'
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

      label:
        'Seguridad Débil 🔴',

      color:
        '#ef4444',

      progress: score,

      entropy,

      crackTime,

      tips,

      level: 'WEAK'
    };
  }

  if (score <= 75) {

    return {

      label:
        'Seguridad Media 🟡',

      color:
        '#facc15',

      progress: score,

      entropy,

      crackTime,

      tips,

      level: 'MEDIUM'
    };
  }

  return {

    label:
      'Seguridad Fuerte 🟢',

    color:
      '#22c55e',

    progress: score,

    entropy,

    crackTime,

    tips,

    level: 'STRONG'
  };
}

/* ======================================================
   MAIN EVALUATOR
====================================================== */

export function evaluatePassword(
  password
) {

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