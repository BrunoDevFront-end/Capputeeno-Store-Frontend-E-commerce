"use client";

import styled from "styled-components";
import { SearchIcon } from "./icons/search-loupe";
import { InputHTMLAttributes } from "react";
import { useState } from "react";

export const PrimaryInput = styled.input`
  width: 100%;
  padding: 10px 16px;

  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: none;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: var(--text-dark);

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    font-size: 14px;
    line-height: 22px;
  }
`;

const InputContainer = styled.div<{ $isOpen: boolean }>`
  position: relative;
  z-index: 5;
  width: 250px;

  svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    width: 352px;
  }

  @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
    width: 70px;
    svg {
      cursor: pointer;
    }
  }
`;

const InputWrapper = styled.div<{ $isOpen: boolean }>`
  @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: absolute;
    top: 30px;
    right: -27px;
    width: 200px;
    z-index: 10;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  value: string;
  handleChange: (value: string) => void;
}

export function PrimaryInputWSearchIcon({ handleChange, ...rest }: InputProps) {
  const [open, setOpen] = useState(false);

  const handleOpenInput = () => {
    setOpen((prev) => !prev);
  };

  const hasValue = !!rest.value;
  return (
    <InputContainer $isOpen={open}>
      <Overlay $isOpen={open} onClick={() => setOpen(false)} />
      <InputWrapper $isOpen={open}>
        <PrimaryInput
          onChange={(e) => handleChange(e.target.value)}
          {...rest}
        />
      </InputWrapper>
      <SearchIcon
        onClick={handleOpenInput}
        style={{
          color: hasValue ? "var(--orange-Low)" : "var(--text-dark)",
        }}
      />
    </InputContainer>
  );
}
