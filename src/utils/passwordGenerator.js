function getRandomChar(chars) {

  const index = Math.floor(
    Math.random() * chars.length
  );

  return chars[index];
}

export function generateSecurePassword(
  length = 18
) {

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
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(numbers),
    getRandomChar(symbols)
  ];

  const remaining =
    length - guaranteed.length;

  const randomChars = [];

  for (
    let i = 0;
    i < remaining;
    i++
  ) {

    randomChars.push(
      getRandomChar(allChars)
    );
  }

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

    const j = Math.floor(
      Math.random() * (i + 1)
    );

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