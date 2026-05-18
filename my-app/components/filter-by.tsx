"use client";
import { DefaultProviders } from "./default-Providers";
import { useFilter } from "@/hooks/useFilter";
import { FilterType } from "@/types/filterTypes";
import { useState } from "react";
import styled from "styled-components";

interface FilterItemProps {
  selected: boolean;
}

const FilterList = styled.ul<{ open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
    position: fixed;
    top: 0;
    right: 0;

    width: 70%;
    height: 100vh;

    background: white;
    flex-direction: column;
    padding: 24px;

    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};

    transition: transform 0.3s ease-in-out;
    z-index: 10;
  }
`;

const FilterItems = styled.li<FilterItemProps>`
  font-family: inherit;
  font-weight: ${(props) => (props.selected ? "600" : "400")};
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;

  color: var(--text-dark);

  border-bottom: ${(props) =>
    props.selected ? "4px solid var(--orange-Low)" : "none"};

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
    display: block;
  }
`;

const Overlay = styled.div<{ open: boolean }>`
  display: none;

  @media (max-width: ${(props) => props.theme.MobileBreakpoint}) {
    display: ${({ open }) => (open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
`;

export function FilterByType() {
  const { type, setType } = useFilter();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeType = (value: FilterType) => {
    setType(value);
    setIsOpen(false);
  };

  return (
    <>
      <MenuButton onClick={() => setIsOpen(true)}>☰</MenuButton>

      <Overlay open={isOpen} onClick={() => setIsOpen(false)} />

      <FilterList open={isOpen}>
        <FilterItems
          selected={type === FilterType.ALL}
          onClick={() => handleChangeType(FilterType.ALL)}
        >
          Todos os produtos
        </FilterItems>

        <FilterItems
          selected={type === FilterType.SHIRT}
          onClick={() => handleChangeType(FilterType.SHIRT)}
        >
          Camisetas
        </FilterItems>

        <FilterItems
          selected={type === FilterType.MUG}
          onClick={() => handleChangeType(FilterType.MUG)}
        >
          Canecas
        </FilterItems>
      </FilterList>
    </>
  );
}
