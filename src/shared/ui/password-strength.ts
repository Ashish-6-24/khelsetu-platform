export const passwordStrength = (pw: string): 0 | 1 | 2 | 3 | 4 => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 16) score++;
  return Math.min(4, score) as 0 | 1 | 2 | 3 | 4;
};
