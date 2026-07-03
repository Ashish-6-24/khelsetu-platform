import { useMemo } from 'react';

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

interface PasswordStrengthResult {
  level: PasswordStrengthLevel;
  score: number;
  feedback: string;
}

export const usePasswordStrength = (
  password: string,
): PasswordStrengthResult => {
  return useMemo(() => {
    if (!password) return { level: 0, score: 0, feedback: 'Enter a password' };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    // Score based on checks
    if (checks.length) score += 20;
    if (checks.hasUpper) score += 20;
    if (checks.hasLower) score += 20;
    if (checks.hasNumber) score += 20;
    if (checks.hasSpecial) score += 20;

    // Length bonus
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Cap score at 100
    score = Math.min(score, 100);

    // Determine level (0-4)
    let level: PasswordStrengthLevel = 0;
    if (score >= 80) level = 4;
    else if (score >= 60) level = 3;
    else if (score >= 40) level = 2;
    else if (score >= 20) level = 1;

    // Feedback messages
    const feedbackMap: Record<PasswordStrengthLevel, string> = {
      0: 'Too weak',
      1: 'Add uppercase, numbers, or special chars',
      2: 'Add more variety or length',
      3: 'Good strength',
      4: 'Strong password',
    };

    return {
      level,
      score,
      feedback: feedbackMap[level],
    };
  }, [password]);
};
