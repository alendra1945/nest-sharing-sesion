export const generateInteger = (): number =>
  Math.floor(Math.random() * 100) % 10;

export const generateVerificationCode = async (
  numberOfDigits: number = 5,
  allowZeroStart: boolean = true,
  returnAsString: boolean = true,
): Promise<string | number> => {
  let digits: number[] = [];
  while (true) {
    const next = generateInteger();
    if (digits.length === numberOfDigits) {
      break;
    }
    if (next === 0 && allowZeroStart === false) {
      continue;
    } else {
      digits.push(next);
    }
  }
  digits = digits.sort(() => Math.random() - 0.5);
  return (await returnAsString)
    ? digits.join('')
    : Number.parseInt(digits.join(''));
};
