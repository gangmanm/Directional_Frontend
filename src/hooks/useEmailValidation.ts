import { useState, useEffect } from "react";

interface EmailValidationResult {
  isValid: boolean;
  error: string;
}

export const useEmailValidation = (email: string): EmailValidationResult => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      setIsValid(false);
      setError("");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setIsValid(false);
      setError("올바른 이메일 형식이 아닙니다.");
    } else {
      setIsValid(true);
      setError("");
    }
  }, [email]);

  return { isValid, error };
};
