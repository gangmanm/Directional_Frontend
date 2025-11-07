import { useCallback } from "react";

const FORBIDDEN_WORDS = ["캄보디아", "프놈펜", "불법체류", "텔레그램"];

export const useForbiddenWords = () => {
  const checkForbiddenWords = useCallback((text: string): string | null => {
    for (const word of FORBIDDEN_WORDS) {
      if (text.includes(word)) {
        return word;
      }
    }
    return null;
  }, []);

  return { checkForbiddenWords };
};
