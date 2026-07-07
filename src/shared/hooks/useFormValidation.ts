import { useCallback, useState } from 'react';

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export interface FieldValidation {
  touched: boolean;
  error: string | null;
  isValidating: boolean;
}

export interface FormValidationState {
  [key: string]: FieldValidation;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validationRules = {
  email: (value: string): ValidationRule => ({
    validate: () => {
      if (!value) return false;
      return emailRegex.test(value);
    },
    message: value ? 'Enter a valid email' : 'Email is required',
  }),
  password: (value: string): ValidationRule => ({
    validate: () => value.length >= 6,
    message: value
      ? 'Password must be at least 6 characters'
      : 'Password is required',
  }),
  required: (value: string): ValidationRule => ({
    validate: () => value.trim().length > 0,
    message: 'This field is required',
  }),
};

export const useFormValidation = (
  initialState: Record<string, string>,
  rules: Record<string, ValidationRule>,
) => {
  const [validation, setValidation] = useState<FormValidationState>(() =>
    Object.keys(initialState).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { touched: false, error: null, isValidating: false },
      }),
      {},
    ),
  );

  const validateField = useCallback(
    (fieldName: string, value: string) => {
      const rule = rules[fieldName];
      if (!rule) return;

      setValidation((prev) => {
        const current = prev[fieldName] || {
          touched: false,
          error: null,
          isValidating: false,
        };
        return {
          ...prev,
          [fieldName]: {
            touched: current.touched,
            error: rule.validate(value) ? null : rule.message,
            isValidating: current.isValidating,
          },
        };
      });
    },
    [rules],
  );

  const touchField = useCallback((fieldName: string) => {
    setValidation((prev) => {
      const current = prev[fieldName] || {
        touched: false,
        error: null,
        isValidating: false,
      };
      return {
        ...prev,
        [fieldName]: {
          touched: true,
          error: current.error,
          isValidating: current.isValidating,
        },
      };
    });
  }, []);

  const setFieldValidating = useCallback(
    (fieldName: string, isValidating: boolean) => {
      setValidation((prev) => {
        const current = prev[fieldName] || {
          touched: false,
          error: null,
          isValidating: false,
        };
        return {
          ...prev,
          [fieldName]: {
            touched: current.touched,
            error: current.error,
            isValidating,
          },
        };
      });
    },
    [],
  );

  const isFormValid = useCallback(
    (values: Record<string, string>) => {
      return Object.entries(rules).every(([fieldName, rule]) => {
        return rule.validate(values[fieldName] || '');
      });
    },
    [rules],
  );

  const resetValidation = useCallback(() => {
    setValidation(
      Object.keys(initialState).reduce(
        (acc, key) => ({
          ...acc,
          [key]: { touched: false, error: null, isValidating: false },
        }),
        {},
      ),
    );
  }, [initialState]);

  return {
    validation,
    validateField,
    touchField,
    setFieldValidating,
    isFormValid,
    resetValidation,
  };
};
