import { useState, useEffect } from "react";

interface EmailValidationResult {
  isValid: boolean;
  error: string;
}

export const useEmailValidation = (email: string): EmailValidationResult => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 이메일이 비어있으면 검증하지 않음
    if (!email) {
      setIsValid(false);
      setError("");
      return;
    }

    // 이메일 정규식 패턴
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
