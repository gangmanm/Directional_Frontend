import { useEffect } from "react";
import * as S from "../styles/Toast";
import { CheckCircle, XCircle, X, AlertCircle } from "lucide-react";
import type { ToastType } from "../styles/Toast";

export type { ToastType };

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  onConfirm?: () => void;
  duration?: number;
}

const Toast = ({
  message,
  type,
  onClose,
  onConfirm,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (type !== "confirm") {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, type]);

  if (type === "confirm") {
    return (
      <S.ToastContainer $type={type}>
        <S.ConfirmContent>
          <S.ToastIcon $type={type}>
            <AlertCircle size={20} />
          </S.ToastIcon>
          <S.ToastMessage>{message}</S.ToastMessage>
        </S.ConfirmContent>
        <S.ConfirmButtons>
          <S.ConfirmButton $variant="cancel" onClick={onClose}>
            취소
          </S.ConfirmButton>
          <S.ConfirmButton
            $variant="confirm"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            확인
          </S.ConfirmButton>
        </S.ConfirmButtons>
      </S.ToastContainer>
    );
  }

  return (
    <S.ToastContainer $type={type}>
      <S.ToastIcon $type={type}>
        {type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
      </S.ToastIcon>
      <S.ToastMessage>{message}</S.ToastMessage>
      <S.CloseButton onClick={onClose}>
        <X size={16} />
      </S.CloseButton>
    </S.ToastContainer>
  );
};

export default Toast;
