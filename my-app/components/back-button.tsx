"use client";

import styled from "styled-components";
import { BackIcon } from "./icons/BackIcon";
import { useRouter } from "next/navigation";
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 150%;
  color: var(--secondary-Text);
  margin-top: 24px;
  margin-left: 16px;

   @media (min-width: ${(props) => props.theme.smallMobileBreakpoint}) {
   margin-left: 0;
`;

interface BtnProps {
  navigate: string;
}

export function BackBtn({ navigate }: BtnProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(navigate);
  };

  return (
    <Button onClick={handleNavigate}>
      <BackIcon /> Voltar
    </Button>
  );
}
