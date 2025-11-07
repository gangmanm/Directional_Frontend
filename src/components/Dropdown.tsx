import { useState, useRef, useEffect } from "react";
import * as S from "../styles/Dropdown";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

const Dropdown = ({
  value,
  onChange,
  options,
  label,
  disabled = false,
  placeholder,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder || "선택하세요";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <S.Container ref={dropdownRef}>
      {label && <S.Label>{label}</S.Label>}
      <S.DropdownButton
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        $isOpen={isOpen}
      >
        <S.DropdownText $hasValue={!!value}>{displayText}</S.DropdownText>
        <S.IconWrapper $isOpen={isOpen}>
          <ChevronDown size={16} />
        </S.IconWrapper>
      </S.DropdownButton>

      {isOpen && !disabled && (
        <S.DropdownMenu>
          {options.map((option) => (
            <S.DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $active={option.value === value}
            >
              {option.label}
            </S.DropdownMenuItem>
          ))}
        </S.DropdownMenu>
      )}
    </S.Container>
  );
};

export default Dropdown;
