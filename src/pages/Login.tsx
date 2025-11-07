import { useState } from "react";
import type { FormEvent } from "react";
import * as S from "../styles/Login";
import { useAuth } from "../contexts/AuthContext";
import { useEmailValidation } from "../hooks/useEmailValidation";
import { useToast } from "../contexts/ToastContext";

const Login = () => {
  const { showError } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const { login } = useAuth();
  const { isValid: isEmailValid, error: emailError } =
    useEmailValidation(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowEmailError(true);

    if (!isEmailValid) {
      showError(emailError || "올바른 이메일을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      const errorObj = err as {
        response?: {
          data?: { message?: string; error?: string };
          status?: number;
        };
        message?: string;
      };

      const status = errorObj.response?.status;

      if (status === 400 || status === 401) {
        showError("이메일 또는 비밀번호를 확인해주세요.");
      } else {
        showError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.LoginTitle>로그인</S.LoginTitle>
        <S.LoginForm onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="email">이메일</S.Label>
            <S.Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setShowEmailError(false);
              }}
              onBlur={() => setShowEmailError(true)}
              required
              placeholder="example@email.com"
              disabled={loading}
              $isInvalid={showEmailError && !!email && !isEmailValid}
            />
            {showEmailError && emailError && (
              <S.ValidationError>{emailError}</S.ValidationError>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="password">비밀번호</S.Label>
            <S.Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              disabled={loading}
            />
          </S.FormGroup>

          <S.LoginButton type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </S.LoginButton>
        </S.LoginForm>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default Login;
