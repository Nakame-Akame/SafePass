const SYMBOL_COUNT = 19;

export function calculateEntropy(
  password
) {

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

export function estimateCrackTime(
  entropy
) {

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